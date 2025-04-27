import { Rating } from "../components/Rating"
import { ReviewCard } from "../components/ReviewCard";
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getSpotifyTrack } from "../scripts/music-search"
import { supabase, getSession } from "../scripts/client"
import { Link } from "react-router-dom"

export const DetailView = () => {
  const params = useParams()

  const [currentUserId, setCurrentUserId] = useState(null)
  const [songData, setSongData] = useState(null)
  const [reviews, setReviews] = useState(null)
  const [avgRating, setAvgRating] = useState(0)

  useEffect(() => {
    // load this song's info from spotify
    async function loadSongData() {
      // get song id
      const songId = params.songId
      if (!songId) {
        return
      }

      // NOTE: nested destructure, a bit confusing but cleaner
      const {
        id: trackId,
        name: trackName,
        artists: [{ name: trackArtistName }],
        album: { images: [, { url: trackImage }] }
      } = await getSpotifyTrack(songId)

      setSongData({
        trackId,
        trackName,
        trackArtistName,
        trackImage
      })
    }

    loadSongData()

    // then load its reviews, made for a matching track id
    async function loadReviews() {
      const { data, error } = await supabase
        .from('reviews')
        .select('*') // fetch all columns
        .eq('review_track_id', params.songId) // where review_track_id matches

      if (!data) {
        console.error(error)
        return
      }

      // load review data
      setReviews(data)

      // compute the avg rating and set it
      setAvgRating(() => {
        // compute avg rating
        if (data.length === 0) {
          return 0; // No reviews, average is 0
        }

        const totalRating = data.reduce((sum, review) => {
          return sum + (review.rating || 0); // safety: if review.rating is missing, treat as 0
        }, 0);

        const averageRating = totalRating / data.length;

        return Math.round(averageRating);
      })
    }

    loadReviews()

    // load uid as well 
    async function loadUid() {
      const session = await getSession()
      if (!session) {
        return
      }

      setCurrentUserId(() => {
        const { user: { id: sessionUid } } = session
        return sessionUid
      })
    }

    loadUid()
  }, [params.songId])

  const reviewButton = songData &&
    <Link
      to={`/review/${songData.trackId}/create`}
      className="bg-blue-600 w-40 text-center px-3 py-2 mt-5 rounded-lg font-bold">
      Review this song
    </Link>

  const reviewCards = reviews?.map((review) => (
    <ReviewCard
      key={review.id}
      reviewId={review.id}
      trackId={review.review_track_id}
      username={review.creator_username}
      rating={review.rating}
      content={review.review_text}
      editable={currentUserId === review.creator_id} // make editable if we created it
    />
  ))

  const songInfoCard = songData &&
    <div className="flex">
      <img src={songData.trackImage} className="w-60 rounded-lg" />

      <div className="ml-5 flex flex-col h-min">
        <span className="text-white text-4xl font-extrabold">{songData.trackName}</span>
        <span className="text-2xl text-gray-600">{songData.trackArtistName}</span>
        <span className="mt-4">
          <Rating rating={avgRating} size="md" />
        </span>
        <span className="self-end">
        </span>
        {reviewButton}
      </div>
    </div>

  return (
    <div className="px-10 flex flex-col">
      {songInfoCard}

      <div className="py-6 flex flex-col items-center justify-center gap-3">
        {reviewCards}
      </div>
    </div>
  )
}
