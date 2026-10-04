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
  showFullOnMobile = false,
}: {
  currentLocale: string;
  className?: string;
  showFullOnMobile?: boolean;
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
      className={cn("gap-1.5 sm:gap-2 px-2.5 sm:px-3 min-h-[44px] sm:min-h-8", className)}
      aria-label={t("switchLanguage")}
      title={t("switchLanguage")}
    >
      <Languages className="h-3.5 w-3.5 text-accent shrink-0" />
      {showFullOnMobile ? (
        <span>{currentLocale === "ar" ? "English" : "العربية"}</span>
      ) : (
        <>
          <span className="hidden sm:inline">{currentLocale === "ar" ? "English" : "العربية"}</span>
          <span className="inline sm:hidden font-semibold text-xs">{currentLocale === "ar" ? "EN" : "ع"}</span>
        </>
      )}
    </Button>
  );
}
