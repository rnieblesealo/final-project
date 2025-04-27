import { useState, useEffect } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import PropTypes from 'prop-types';
import clsx from "clsx"

export const Rating = ({ rating, size }) => {
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
        stars.push(<FaStarHalf key="halfstar" />)
      }

      // determine star size
      const finalSize = clsx(
        size == "sm" && "text-lg",
        size == "md" && "text-3xl",
        size == "lg" && "text-5xl",
        !size && "text-md" // WARN: is this even a thing? oh well it works!
      )

      return (
        <div className={`${finalSize} flex items-center justify-left text-white w-full h-full`}>
          {stars}
        </div>
      )
    });
  }, [rating, size]);

  return stars ?? <span className="text-sm">(No ratings)</span>
}

// Add prop type validation
Rating.propTypes = {
  rating: PropTypes.number.isRequired, // rating should be a number
  size: PropTypes.oneOf(['sm', 'md', 'lg']), // size should only be one of these values
};
