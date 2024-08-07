import { getProductRatings } from "@/utils/actions";
import { FaStar } from "react-icons/fa6";

async function ProductRating({ productID }: { productID: string }) {
  const { averageRating, totalRatings } = await getProductRatings({
    productID,
  });
  return (
    <>
      {totalRatings !== 0 && (
        <div className="my-2 flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <h2>{averageRating}</h2>
            <FaStar className="mb-[3px]" />
          </div>
          <h2>
            {`(${totalRatings} customer review${totalRatings > 1 ? "s" : ""})`}
          </h2>
        </div>
      )}
    </>
  );
}
export default ProductRating;
