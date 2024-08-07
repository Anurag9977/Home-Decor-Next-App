"use client";

import LoadingReviewsContainer from "@/components/global/LoadingReviewsContainer";
import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <>
      <Skeleton className="h-10 w-full" />
      <div className="mt-8">
        <LoadingReviewsContainer />
      </div>
    </>
  );
}
export default loading;
