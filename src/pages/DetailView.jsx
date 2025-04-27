import { Rating } from "../components/Rating"
import { ReviewCard } from "../components/ReviewCard";
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getSpotifyTrack } from "../scripts/music-search"
import { Link } from "react-router-dom"

export const DetailView = () => {
  const params = useParams()

  const [songData, setSongData] = useState(null)

  useEffect(() => {
    async function loadSongData() {
      // get song id
      const songId = params.songId
      console.log(songId)
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
  }, [params.songId])

  const reviewButton = songData &&
    <Link
      to={`/createreview/${songData.trackId}`}
      className="bg-blue-600 w-40 text-center px-3 py-2 mt-5 rounded-lg font-bold">
      Review this song
    </Link>

  const songInfoCard = songData &&
    <div className="flex">
      <img src={songData.trackImage} className="w-60 rounded-lg" />

      <div className="ml-5 flex flex-col h-min">
        <span className="text-white text-4xl font-extrabold">{songData.trackName}</span>
        <span className="text-2xl text-gray-600">{songData.trackArtistName}</span>
        <span className="mt-4">
          <Rating rating={5} size="md" />
        </span>
        <span className="self-end">
        </span>
        {reviewButton}
      </div>
    </div>


  return (
    <div className="px-10 flex flex-col">

      {songInfoCard}

      <div className="py-6">
        <ReviewCard
          username="rnieblesealo"
          rating={10}
          content='"Gravity Bong" by Meth Wax is the perfect soundtrack for zoning out. With its fuzzed-out guitars and dreamy, hypnotic rhythms, it feels like being enveloped in a cloud of smoke. The track has a loose, almost unhurried vibe, drawing you in with its heavy bassline and raw, gritty vocals. It’s a slow, psychedelic journey that doesn’t rush but builds effortlessly. Themes of escape and indulgence run through the lyrics, resonating deeply. It’s not just a song—it’s a mood, a vibe, a trip. Perfect for anyone looking to get lost in a haze of sound'
        />
      </div>

    </div>
  )
}
