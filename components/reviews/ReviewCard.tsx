import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Comment from "./Comment";
import RatingStars from "./RatingStars";
import { ReviewCardProps } from "@/utils/types";
import DeleteReviewButton from "./DeleteReviewButton";

function ReviewCard({ reviewInfo, children }: ReviewCardProps) {
  const { title, type, rating, comment, image, productID } = reviewInfo;
  return (
    <Card className="relative w-full min-h-44 p-6">
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src={image} alt={title} />
        </Avatar>
        <CardHeader className="px-4 py-0 flex flex-col justify-center">
          <CardTitle className="tracking-wide">
            {type === "product" ? (
              title
            ) : (
              <Link href={`/products/${productID}`} className="hover:underline">
                {title}
              </Link>
            )}
          </CardTitle>
          <RatingStars rating={rating} />
        </CardHeader>
      </div>
      <CardContent className="p-0 mt-4 text-sm text-justify leading-normal">
        <Comment comment={comment} />
      </CardContent>
      <div className="absolute top-4 right-3">{children}</div>
    </Card>
  );
}
export default ReviewCard;
