"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import ReviewForm from "./ReviewForm";

function CreateReview({ productID }: { productID: string }) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  return (
    <div>
      <Button
        type="button"
        variant={showReviewForm ? "secondary" : "default"}
        className="tracking-wide"
        onClick={() => setShowReviewForm(!showReviewForm)}
      >
        {showReviewForm ? "Cancel" : "Write a review"}
      </Button>
      {showReviewForm && (
        <div className="mt-4">
          <ReviewForm productID={productID} />
        </div>
      )}
    </div>
  );
}
export default CreateReview;
