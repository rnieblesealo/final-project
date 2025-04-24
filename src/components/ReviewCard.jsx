import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Rating } from "../components/Rating";

export const ReviewCard = ({ username, rating, content }) => {
  const [liked, setLiked] = useState(true);

  const likeButton = liked
    ? (<span className="mt-5 text-sm flex items-center font-bold"><FaHeart className="mr-2 text-lg text-red-500" /> You liked this review</span>)
    : (<span className="mt-5 text-sm flex items-center"><FaRegHeart className="mr-2 text-lg" /> Like this review</span>);

  return (
    <div className="outline-3 outline-gray-800 text-white w-fit max-w-125 h-fit p-4 rounded-lg flex flex-col">
      <span className="flex mb-5">
        <span className="text-gray-500">
          Review by <span className="ml-1 font-bold text-gray-200">{username}</span>
        </span>
        <span className="ml-2">
          <Rating rating={rating} />
        </span>
      </span>

      <span className="text-sm text-gray-300">
        {content}
      </span>

      {likeButton}
    </div>
  );
};

