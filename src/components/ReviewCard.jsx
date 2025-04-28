import { FaHeart, FaRegHeart, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom"
import { Rating } from "../components/Rating";
import { supabase, getSession } from "../scripts/client"
import { useState, useEffect } from "react"

export const ReviewCard = ({ reviewId, trackId, username, rating, content, editable, parentReloads, setParentReloads }) => {
  const [liked, setLiked] = useState(false)
  const [totalLikes, setTotalLikes] = useState(0)
  const [reloads, setReloads] = useState(0)

  useEffect(() => {
    async function loadLikeState() {
      // check if logged in user has liked this review
      const session = await getSession()
      if (!session) {
        return
      }

      // get liker id (our own)
      const { user: { id: likerId } } = session

      // check if we've liked this review
      const { data } = await supabase
        .from('likes')
        .select('id') // only select id (lighter)
        .eq('review_id', reviewId)
        .eq('liker_id', likerId)
        .maybeSingle(); // Expect 0 or 1 result 

      setLiked(data ? true : false)

      // count total likes
      const { count } = await supabase
        .from('likes')
        .select('id', { count: 'exact', head: true }) // don't fetch rows, just count
        .eq('review_id', reviewId);

      setTotalLikes(count)
    }

    loadLikeState()
  }, [reviewId, reloads])

  async function handleLike() {
    const session = await getSession()
    if (!session) {
      return
    }

    // get liker id (our own)
    const { user: { id: likerId } } = session

    // check if we've liked this review
    const { data: likeCheck } = await supabase
      .from('likes')
      .select('id') // only select id (lighter)
      .eq('review_id', reviewId)
      .eq('liker_id', likerId)
      .maybeSingle(); // Expect 0 or 1 result 

    // if check returs something, delete like 
    if (likeCheck) {
      await supabase
        .from('likes')
        .delete()
        .match({
          review_id: reviewId,
          liker_id: likerId
        })
        .select()
    } else {
      // otherwise create a like
      await supabase
        .from('likes')
        .insert({
          review_id: reviewId, // the review being liked
          liker_id: likerId,   // the user doing the like
        })
    }

    // mark update
    setReloads(reloads + 1)
  }

  async function handleDelete() {
    await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId);

    // mark update in parent
    setParentReloads(parentReloads + 1)
  }

  const likeButton =
    <button
      onClick={handleLike}
      className="mt-5 text-sm flex items-center cursor-pointer">
      {liked ? <FaHeart className="mr-2 text-lg text-red-500" /> : <FaRegHeart className="mr-2 text-lg" />}
      <span>{liked ? "You liked this review" : "Like review"}</span>
    </button>

  const editButton = editable &&
    <Link
      to={`/review/${trackId}/edit/${reviewId}`}
      className="mt-5 text-sm flex items-center">
      <FaEdit className="mr-2 text-lg" />
      Edit
    </Link>

  const deleteButton = editable &&
    <button
      onClick={handleDelete}
      className="mt-5 text-sm flex items-center cursor-pointer">
      <FaTrash className="mr-2 text-lg" />
      <span>Delete</span>
    </button>

  return (
    <div className="outline-1 outline-white text-white p-4 rounded-lg flex flex-col w-full h-min">
      <span className="flex mb-5 items-center">
        <span className="text-gray-500">
          Review by <span className="ml-1 font-bold text-gray-200">{username}</span>
        </span>
        <span className="ml-2">
          <Rating rating={rating} />
        </span>
        <span className="text-gray-500 flex items-center text-xs ml-2">
          <FaHeart className="text-md mr-1" />{totalLikes}
        </span>
      </span>

      <span className="text-sm">
        {content}
      </span>

      <div className="flex items-center gap-5">
        {likeButton}
        {editButton}
        {deleteButton}
      </div>
    </div>
  );
};
