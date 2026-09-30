"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const emptySubscribe = () => () => {};

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
      className="gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
      aria-label={t("toggleTheme")}
      title={t("toggleTheme")}
    >
      {isDark ? (
        <>
          <Sun className="h-3.5 w-3.5 text-amber-500" />
          <span>{t("lightMode")}</span>
        </>
      ) : (
        <>
          <Moon className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{t("darkMode")}</span>
        </>
      )}
    </Button>
  );
}
