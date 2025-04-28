import { FaMusic } from "react-icons/fa6";
import { Rating } from "./Rating"
import { Link } from "react-router-dom"

export const SongCard = ({
  trackId, name, artist, rating, ratingCount, coverSrc
}) => {
  return (
    <Link
      to={`/view/${trackId}`}
      className="bg-gray-950 w-full h-full rounded-xl text-white p-2 cursor-pointer transition-shadow duration-200 shadow-2xl shadow-white/10 hover:shadow-2xl hover:shadow-white/30">
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
        <span className="text-gray-500">{artist ?? "(Unknown Artist)"}</span>

        <div className="flex flex-col my-1 items-start justify-center">
          <div className="flex items-center">
            <Rating rating={rating} />
            <span className="ml-1 text-xs font-bold">{rating > 0 && (rating / 2).toFixed(1)}</span>
          </div>
          {ratingCount &&
            <span className="my-1 text-xs text-gray-400 py-1 rounded-2xl">
              {ratingCount} review(s)
            </span>
          }
        </div>
      </div>
    </Link>
  );
};
