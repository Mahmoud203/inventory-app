"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Button } from "./button";
import { Languages } from "lucide-react";

import { cn } from "@/lib/utils";

export function LocaleSwitcher({
  currentLocale,
  className,
}: {
  currentLocale: string;
  className?: string;
}) {
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = currentLocale === "ar" ? "en" : "ar";
    const query = typeof window !== "undefined" ? window.location.search : "";
    const fullPath = query ? `${pathname}${query}` : pathname;
    router.replace(fullPath, { locale: nextLocale });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLocale}
      className={cn("gap-2", className)}
      aria-label={t("switchLanguage")}
      title={t("switchLanguage")}
    >
      <Languages className="h-3.5 w-3.5 text-accent" />
      <span>{currentLocale === "ar" ? "English" : "العربية"}</span>
    </Button>
  );
}
