import React from "react";
import { Star } from "lucide-react";

const StarRating = ({ rating, max = 5 }) => {
  const stars = [];

  for (let i = 1; i <= max; i++) {
    if (rating >= i) {
      // voller Stern
      stars.push(
        <Star
          key={i}
          className="w-6 h-6 fill-yellow-400 text-yellow-400"
        />
      );
    } else if (rating >= i - 0.5) {
      // halber Stern
      stars.push(
        <div key={i} className="relative w-6 h-6">
          <Star className="absolute w-6 h-6 text-gray-300" />
          <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
            <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    } else {
      // leerer Stern
      stars.push(<Star key={i} className="w-6 h-6 text-gray-300" />);
    }
  }

  return <div className="flex space-x-1">{stars}</div>;
};

export default StarRating;
