import { useState, useEffect } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { getSpotifyTrack } from "../scripts/music-search"
import { supabase, getSession } from "../scripts/client"
import { Rating } from "../components/Rating"

export const CreateReview = () => {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const isEditing = location.pathname.includes("/edit/")

  const [songData, setSongData] = useState(null)
  const [cursorRating, setCursorPercent] = useState(null)
  const [reviewText, setReviewText] = useState("")

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

      // set the song's data
      setSongData({
        trackId,
        trackName,
        trackArtistName,
        trackImage
      })
    }

    loadSongData()
  }, [params.songId, cursorRating])

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

  async function handleCreatePost() {
    // get session
    const session = await getSession()
    if (!session) {
      console.error("No session")
      return
    }

    // from session info get username and id
    const { user: { id: userId, user_metadata: { username: userName } } } = session

    // write to review table!
    const { error } = await supabase
      .from("reviews")
      .insert({
        creator_id: userId,
        creator_username: userName,
        rating: cursorRating,
        review_text: reviewText,
        review_track_id: songData?.trackId
      })

    // if successful navigate to song detail view
    if (error) {
      console.error("Insert error: ", error)
    } else {
      console.log("Successfully entered review!")
      navigate(`/view/${songData?.trackId}`)
    }
  }

  async function handleEditPost() {
    // get session
    const session = await getSession()
    if (!session) {
      console.error("No session")
      return
    }

    // from session info get username and id
    const { user: { id: userId } } = session

    console.log("UPDATE CRED: ", params.reviewId, userId, songData?.trackId)

    // write to review table!
    const { data, error } = await supabase
      .from("reviews")
      .update({
        rating: cursorRating,
        review_text: reviewText,
        review_track_id: songData?.trackId
      })
      .match({ id: params.reviewId, creator_id: userId, review_track_id: songData?.trackId })
      .select()

    // if successful navigate to song detail view
    if (error) {
      console.error("Insert error: ", error)
    } else {
      console.log("Successfully edited review: ", data)
      navigate(`/view/${songData?.trackId}`)
    }
  }

  // note the rating box needs a fixed size because we're calculating the position of the cursor from it
  const reviewOptions = songData &&
    <div className="flex flex-col items-center">
      <img src={songData.trackImage} className="w-60 rounded-lg" />

      <div className="w-full flex flex-col items-center my-8">
        <span className="text-2xl font-extrabold text-gray-500">
          <span className="text-white mx-2">{songData.trackName}</span>
          by
          <span className="text-white mx-2">{songData.trackArtistName}</span>
        </span>

        <div
          onMouseMove={handleMouseMove}
          className="text-4xl w-[180px] h-[50px] mt-3 flex items-center">
          <div className="absolute z-2">
            <Rating rating={10} dim />
          </div>
          <div className="relative z-3">
            <Rating rating={cursorRating > 0 ? cursorRating : 1 /* min rating 1 */} />
          </div>
        </div>
      </div>

      <textarea
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review here..."
        className="w-3/4 h-48 p-4 rounded-xl text-white text-lg resize-none overflow-y-auto outline-1 focus:outline-3"
      />

      <button
        onClick={isEditing ? handleEditPost : handleCreatePost}
        className="bg-green-700 w-40 p-4 mt-5 rounded-lg font-bold cursor-pointer">
        {isEditing ? "Edit" : "Post"}
      </button>

    </div>

  return (
    <div className="px-10 flex flex-col items-center">
      {reviewOptions}
    </div>
  )
}
