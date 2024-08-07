import { Skeleton } from "../ui/skeleton";

function LoadingSectionContainer() {
  return (
    <section>
      <Skeleton className="w-full h-8" />
      <Skeleton className="mt-4 w-full h-72" />
    </section>
  );
}
export default LoadingSectionContainer;
