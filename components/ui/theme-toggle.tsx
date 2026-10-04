"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const emptySubscribe = () => () => { };

export function ThemeToggle() {
  const t = useTranslations("common");
  const { resolvedTheme, setTheme } = useTheme();

  // Prevents hydration mismatch without causing cascading re-renders
  const isMounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDark = isMounted && resolvedTheme === "dark";

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="gap-1.5 sm:gap-2 px-2.5 sm:px-3 min-h-[44px] sm:min-h-8 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
      aria-label={t("toggleTheme")}
      title={t("toggleTheme")}
    >
      {isDark ? (
        <>
          <Sun className="h-3.5 w-3.5 text-amber-500 shrink-0" />
          <span className="hidden sm:inline">{t("lightMode")}</span>
        </>
      ) : (
        <>
          <Moon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <span className="hidden sm:inline">{t("darkMode")}</span>
        </>
      )}
    </Button>
  );
}
