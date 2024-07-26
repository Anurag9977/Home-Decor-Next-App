import { FaStar } from "react-icons/fa6";

function ProductRating() {
  const stars = 4.5;
  const reviews = 2;
  return (
    <div className="my-2 flex items-center gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-1">
        <h2>{stars}</h2>
        <FaStar className="mb-[5px]" />
      </div>
      <h2>{`(${reviews} customer reviews)`} </h2>
    </div>
  );
}
export default ProductRating;
