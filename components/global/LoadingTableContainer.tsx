import { Skeleton } from "../ui/skeleton";

function LoadingTableContainer({ numOfRows = 5 }: { numOfRows?: number }) {
  const rows = Array.from({ length: numOfRows }, (_, index) => {
    return (
      <div key={index}>
        <Skeleton className="mb-2 w-full h-10" />
      </div>
    );
  });
  return (
    <section>
      <Skeleton className="mb-4 w-full h-8" />
      {rows.map((row) => {
        return row;
      })}
    </section>
  );
}
export default LoadingTableContainer;
