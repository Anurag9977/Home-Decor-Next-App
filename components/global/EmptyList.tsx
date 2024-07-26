import { cn } from "@/lib/utils";

function EmptyList({
  text = "No items found.",
  className,
}: {
  text?: string;
  className?: string;
}) {
  return <h2 className={cn("text-lg", className)}>{text}</h2>;
}
export default EmptyList;
