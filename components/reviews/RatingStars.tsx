import { FaRegStar, FaStar } from "react-icons/fa6";

function RatingStars({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1 <= rating);
  return (
    <div className="flex items-center">
      {stars.map((star, index) => {
        return (
          <div key={index}>
            {star ? (
              <FaStar className="text-primary" />
            ) : (
              <FaRegStar className="text-muted-foreground" />
            )}
          </div>
        );
      })}
    </div>
  );
}
export default RatingStars;
