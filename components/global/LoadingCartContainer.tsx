import { Skeleton } from "../ui/skeleton";

function LoadingCartContainer() {
  return (
    <div>
      <Skeleton className="h-10 w-full" />
      <div className="mt-8 grid lg:grid-cols-[2fr_1fr] lg:gap-x-8 xl:gap-x-16 gap-y-8">
        <div>
          <Skeleton className="w-full h-24 lg:h-32 mb-4" />
          <Skeleton className="w-full h-24 lg:h-32 mb-4" />
          <Skeleton className="w-full h-24 lg:h-32 mb-4" />
        </div>
        <Skeleton className="h-52 w-full" />
      </div>
    </div>
  );
}
export default LoadingCartContainer;
