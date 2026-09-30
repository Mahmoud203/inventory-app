import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-secondary/70 border border-border/20",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
