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

  const songInfoCard = songData &&
    <div className="flex">
      <img src={songData.trackImage} className="w-60" />

      <div className="ml-5 flex flex-col">
        <span className="text-white text-4xl font-extrabold">{songData.trackName}</span>
        <span className="text-3xl text-gray-600">{songData.trackArtist}</span>
        <Rating rating={0} size="md" />
      </div>
    </div>

  const reviewButton = songData &&
    <Link
      to={`/createreview/${songData.trackId}`}
      className="bg-blue-600 w-40 p-4 mt-5 rounded-2xl font-bold">
      Review this song
    </Link>

  return (
    <div className="px-10 flex flex-col">

      {songInfoCard}
      {reviewButton}

      <div className="py-6">
        {/*Reviews go here!*/}
      </div>

    </div>
  )
}
