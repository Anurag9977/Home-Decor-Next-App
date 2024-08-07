import { Prisma } from "@prisma/client";
import ReviewCard from "./ReviewCard";
import { ReviewCardProps } from "@/utils/types";
import DeleteReviewButton from "./DeleteReviewButton";

type UserReviewsWithProductProps = Prisma.ReviewGetPayload<{
  include: { product: true };
}>;

function UserReviews({
  userReviews,
}: {
  userReviews: UserReviewsWithProductProps[];
}) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {userReviews.map((review) => {
        const {
          id,
          product: { id: productID, name, image },
          comment,
          rating,
        } = review;
        const reviewProp: ReviewCardProps = {
          reviewInfo: {
            type: "user",
            title: name,
            comment,
            rating,
            image: image,
            productID,
          },
        };
        return (
          <div key={id}>
            <ReviewCard reviewInfo={reviewProp.reviewInfo}>
              <DeleteReviewButton reviewID={id} />
            </ReviewCard>
          </div>
        );
      })}
    </div>
  );
}
export default UserReviews;
