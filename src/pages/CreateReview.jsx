import { useState, useRef, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getSpotifyTrack } from "../scripts/music-search"
import { FaStar, FaStarHalf } from "react-icons/fa";
import { Rating } from "../components/Rating"

export const CreateReview = () => {
  const params = useParams()

  const [songData, setSongData] = useState(null)
  const [cursorPercent, setCursorPercent] = useState(null)

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

    console.log(cursorPercent)
  }, [params.songId, cursorPercent])

  // compute rating based on mouse position within stars rect
  function handleMouseMove(e) {
    const div = e.currentTarget; // the div the mouse is over
    const rect = div.getBoundingClientRect(); // get div's position and size
    const x = e.clientX - rect.left; // cursor's x position relative to div
    const width = rect.width;

    // calculate percentage (0 to 1)
    const percent = x / width;

    // clamp between 0 and 1 just in case
    const clampedPercent = Math.min(Math.max(percent, 0), 1);

    // scale to 0-10 and round
    const rating = Math.round(clampedPercent * 10);

    // update your state
    setCursorPercent(rating);
  }

  // FIXME: rating div is extremely chopped, fix absolute positioning
  //
  // note the rating box needs a fixed size because we're calculating the position of the cursor from it
  const reviewOptions = songData &&
    <div className="flex flex-col items-center">
      <img src={songData.trackImage} className="w-60" />

      <div className="w-full flex flex-col items-center my-8">
        <span className="text-2xl font-extrabold text-gray-500">
          Review
          <span className="text-white mx-2">{songData.trackName}</span>
          by
          <span className="text-white mx-2">{songData.trackArtistName}</span>
        </span>

        <div
          onMouseMove={handleMouseMove}
          className="text-4xl w-[180px] h-[50px] flex items-center">
          <Rating rating={cursorPercent} />
        </div>
      </div>

      <textarea
        placeholder="Write your review here..."
        className="w-3/4 h-48 p-4 rounded-xl bg-gray-800 text-white text-lg resize-none overflow-y-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        to={`/createreview/${songData.trackId}`}
        className="bg-green-700 w-40 p-4 mt-5 rounded-2xl font-bold">
        Post!
      </button>

    </div>

  return (
    <div className="px-10 flex flex-col items-center">
      {reviewOptions}
    </div>
  )
}
