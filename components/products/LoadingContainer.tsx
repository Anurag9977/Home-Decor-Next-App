import { Skeleton } from "../ui/skeleton";

function LoadingContainer() {
  return (
    <section>
      <Skeleton className="h-10 w-full" />
      <section className="my-8 grid md:grid-cols-2  lg:grid-cols-3 gap-8">
        <LoadingContent />
        <LoadingContent />
        <LoadingContent />
        <LoadingContent />
        <LoadingContent />
        <LoadingContent />
      </section>
    </section>
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

export default LoadingContainer;
