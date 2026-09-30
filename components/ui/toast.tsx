"use client";

import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-surface group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-card group-[.toaster]:rounded-md group-[.toaster]:font-inherit",
          description: "group-[.toast]:text-muted text-xs",
          actionButton:
            "group-[.toast]:bg-accent group-[.toast]:text-accent-foreground group-[.toast]:rounded-sm group-[.toast]:text-xs group-[.toast]:font-medium",
          cancelButton:
            "group-[.toast]:bg-secondary group-[.toast]:text-secondary-foreground group-[.toast]:rounded-sm group-[.toast]:text-xs",
          success:
            "group-[.toaster]:border-success/30 group-[.toast]:text-foreground",
          error:
            "group-[.toaster]:border-danger/30 group-[.toast]:text-foreground",
          warning:
            "group-[.toaster]:border-warning/30 group-[.toast]:text-foreground",
          info:
            "group-[.toaster]:border-accent/30 group-[.toast]:text-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
