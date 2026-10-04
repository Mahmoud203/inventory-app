import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-150 ease-out select-none disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-foreground shadow-soft hover:bg-accent-hover active:bg-accent-hover/90",
        secondary:
          "bg-secondary text-secondary-foreground border border-border shadow-soft hover:bg-secondary-hover active:bg-border",
        outline:
          "border border-border bg-surface text-foreground shadow-soft hover:bg-surface-hover hover:border-border/80 active:bg-secondary",
        ghost:
          "bg-transparent text-muted-foreground hover:bg-surface-hover hover:text-foreground active:bg-secondary",
        danger:
          "bg-danger text-danger-foreground shadow-soft hover:bg-danger-hover active:bg-danger-hover/90",
      },
      size: {
        sm: "min-h-[44px] sm:min-h-0 h-11 sm:h-8 px-3 text-xs rounded-sm gap-1.5",
        md: "min-h-[44px] sm:min-h-0 h-11 sm:h-10 px-4 text-sm rounded-md gap-2",
        lg: "min-h-[44px] h-12 px-6 text-base rounded-lg gap-2.5",
        icon: "min-h-[44px] min-w-[44px] sm:min-h-8 sm:min-w-8 h-11 w-11 sm:h-8 sm:w-8 p-0 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin text-current me-2 shrink-0" aria-hidden="true" />
        )}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
