import { Skeleton } from "../ui/skeleton";

function LoadingReviewsContainer() {
  return (
    <div className="grid md:grid-cols-2  lg:grid-cols-3 gap-8">
      <LoadingContent />
      <LoadingContent />
      <LoadingContent />
    </div>
  );
}

function LoadingContent() {
  return (
    <div>
      <Skeleton className="h-36 w-full rounded-lg" />
    </div>
  );
}

export default LoadingReviewsContainer;
