import { useState, useEffect } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { FaMusic } from "react-icons/fa6";

export const SongCard = ({
  name, artist, rating, ratingCount, coverSrc
}) => {
  const [stars, setStars] = useState(null);

  useEffect(() => {
    // calculate amt of stars
    setStars(() => {
      if (rating === undefined) {
        return null;
      }

      const fullStars = Math.floor(rating / 2);
      const halfStars = rating % 2;

      const stars = [];

      // push amt of full stars
      for (let i = 0; i < fullStars; ++i) {
        stars.push(<FaStar key={`${i}-fullstar`} />);
      }

      // note there can only be 1 half star
      if (halfStars) {
        stars.push(
          <div key="halfstar" className="relative w-[16px] h-[16px]">
            <FaStarHalf className="absolute z-2" />
            <FaStar className="absolute text-gray-600 z-1" />
          </div>
        );
      }

      return stars;
    });
  }, [rating]);

  return (
    <div className="bg-gradient-to-b from-black to-slate-900 h-fit w-fit rounded-sm text-white p-2">
      {coverSrc
        ?
        <img
          src={coverSrc}
          className="w-40 aspect-square object-cover mb-1" />
        :
        <div className="w-40 bg-gray-600 aspect-square mb-1 flex items-center justify-center">
          <FaMusic className="text-3xl text-gray-800" />
        </div>}

      <div className="flex flex-col">
        <span className="font-bold">{name ?? "(Unknown Name)"}</span>
        <span className="text-gray-500 ">{artist ?? "(Unknown Artist)"}</span>

        <div className="flex my-1 items-center">
          {stars ?? <span className="text-sm">(No ratings)</span>}
          <span className="ml-1 text-sm py-1 px-2 rounded-2xl bg-black font-bold">
            {ratingCount?.toLocaleString()}
          </span>
        </div>
      </div>

    </div>
  );
};

