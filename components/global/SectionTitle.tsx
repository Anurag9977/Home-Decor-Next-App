import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

function SectionTitle({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <>
      <h1
        className={cn(
          "tracking-wider capitalize font-semibold text-2xl",
          className
        )}
      >
        {title}
      </h1>
      <Separator className="my-2" />
    </>
  );
}
export default SectionTitle;
