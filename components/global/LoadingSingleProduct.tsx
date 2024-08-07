import { Skeleton } from "../ui/skeleton";

function LoadingSingleProduct() {
  return (
    <div>
      <Skeleton className="h-10 w-full" />
      <div className="my-8 grid lg:grid-cols-2 gap-x-16 gap-y-8">
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    </div>
  );
}

export default LoadingSingleProduct;
