import { cn } from "@/lib/utils";

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto lg:w-[90%] xl:w-[85%] px-8", className)}>
      {children}
    </div>
  );
}
export default Container;
