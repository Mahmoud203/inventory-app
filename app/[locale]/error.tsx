"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  React.useEffect(() => {
    console.error("App error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-danger/10 border border-danger/20 shadow-soft text-danger">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t("title")}
          </h1>
          <p className="text-sm text-muted max-w-sm mx-auto leading-relaxed">
            {t("description")}
          </p>
          {error.digest && (
            <p className="text-xs font-mono text-muted/60 mt-1">
              Digest: {error.digest}
            </p>
          )}
        </div>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Button
            onClick={() => reset()}
            variant="primary"
            size="md"
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>{t("retry")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
