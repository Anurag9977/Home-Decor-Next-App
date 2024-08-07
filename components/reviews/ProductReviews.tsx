import { getProductReviews } from "@/utils/actions";
import EmptyList from "../global/EmptyList";
import ReviewCard from "./ReviewCard";
import { ReviewCardProps } from "@/utils/types";

async function ProductReviews({ productID }: { productID: string }) {
  const productReviews = await getProductReviews({
    productID: productID,
  });
  return (
    <div className="mt-8">
      {productReviews.length === 0 ? (
        <EmptyList text="No reviews for this product." />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productReviews.map((review) => {
            const { id, authorName, authorImageURL, rating, comment } = review;
            const reviewProp: ReviewCardProps = {
              reviewInfo: {
                type: "product",
                title: authorName,
                comment,
                rating,
                image: authorImageURL,
              },
            };
            return (
              <div key={id}>
                <ReviewCard reviewInfo={reviewProp.reviewInfo} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default ProductReviews;
