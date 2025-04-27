import { FaMusic } from "react-icons/fa6";
import { Rating } from "./Rating"
import { Link } from "react-router-dom"

export const SongCard = ({
  trackId, name, artist, rating, ratingCount, coverSrc
}) => {

  return (
    <Link
      to={`/view/${trackId}`}
      className="border-1 w-full rounded-xl text-white p-2 cursor-pointer transition-shadow duration-100 hover:shadow-2xl hover:shadow-white/50">
      {coverSrc
        ?
        <img
          src={coverSrc}
          className="w-full aspect-square object-cover mb-1 rounded-sm" />
        :
        <div className="w-40 bg-gray-600 aspect-square mb-1 flex items-center justify-center">
          <FaMusic className="text-3xl text-gray-800" />
        </div>}

      <div className="flex flex-col">
        <span className="font-bold">{name ?? "(Unknown Name)"}</span>
        <span className="text-gray-500 ">{artist ?? "(Unknown Artist)"}</span>

        <div className="flex my-1 items-center">
          <Rating rating={rating} />
          {ratingCount &&
            <span className="ml-1 text-xs py-1 px-2 rounded-2xl bg-black font-bold">
              {ratingCount.toLocaleString()}
            </span>
          }
        </div>
      </div>
    </Link>
  );
};
