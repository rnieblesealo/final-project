import { FaHeart, FaRegHeart, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom"
import { Rating } from "../components/Rating";

export const ReviewCard = ({ reviewId, trackId, username, rating, content, liked, editable }) => {
  const likeButton = liked
    ? <span className="mt-5 text-sm flex items-center font-bold"><FaHeart className="mr-2 text-lg text-red-500" /> You liked this review</span>
    : <span className="mt-5 text-sm flex items-center"><FaRegHeart className="mr-2 text-lg" /> Like this review</span>;

  const editButton = editable &&
    <Link
      to={`/review/${trackId}/edit/${reviewId}`}
      className="mt-5 text-sm flex items-center">
      <FaEdit className="mr-2 text-lg" />
    </Link>

  return (
    <div className="outline-1 outline-white text-white p-4 rounded-lg flex flex-col w-full h-min">
      <span className="flex mb-5 items-center">
        <span className="text-gray-500">
          Review by <span className="ml-1 font-bold text-gray-200">{username}</span>
        </span>
        <span className="ml-2">
          <Rating rating={rating} />
        </span>
      </span>

      <span className="text-sm">
        {content}
      </span>

      <div className="flex items-center gap-5">
        {likeButton}
        {editButton}
      </div>
    </div>
  );
};
