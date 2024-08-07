import { Skeleton } from "../ui/skeleton";

function LoadingProductsContainer() {
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
      <Skeleton className="h-56 w-full rounded-lg" />
      <Skeleton className="mt-4 h-8 w-full rounded-lg" />
    </div>
  );
}

export default LoadingProductsContainer;
