import * as React from "react";
import { PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ElementType | React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon: Icon = PackageOpen,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  const renderIcon = () => {
    if (React.isValidElement(Icon)) {
      return Icon;
    }
    if (Icon) {
      const Component = Icon as React.ElementType;
      return <Component className="h-6 w-6 stroke-[1.5]" />;
    }
    return <PackageOpen className="h-6 w-6 stroke-[1.5]" />;
  };

  return (
    <div
      className={cn(
        "flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface/50 p-8 text-center animate-in fade-in-50 duration-200",
        className
      )}
      {...props}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/80 text-muted-foreground ring-8 ring-secondary/30 mb-4 shadow-soft">
        {renderIcon()}
      </div>
      <h3 className="text-base font-semibold text-foreground tracking-tight max-w-sm">
        {title}
      </h3>
      {description && (
        <p className="mt-1.5 text-xs text-muted max-w-sm leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-6 flex items-center justify-center">{action}</div>}
    </div>
  );
}
