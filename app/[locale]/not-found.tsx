"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowLeft, ArrowRight, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface border border-border shadow-soft text-muted">
          <FileQuestion className="h-8 w-8 text-accent" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t("title")}
          </h1>
          <p className="text-sm text-muted max-w-sm mx-auto leading-relaxed">
            {t("description")}
          </p>
        </div>
        <div className="pt-2">
          <Button asChild variant="primary" size="md">
            <Link href="/sections" className="inline-flex items-center gap-2">
              <span className="rtl:hidden inline-flex">
                <ArrowLeft className="h-4 w-4" />
              </span>
              <span className="ltr:hidden inline-flex">
                <ArrowRight className="h-4 w-4" />
              </span>
              <span>{t("backHome")}</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
