"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/ui/locale-switcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SearchBar } from "@/components/SearchBar";
import { toast } from "sonner";

export function TopNav({ currentLocale }: { currentLocale: string }) {
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success(tNav("logout"));
      router.push("/login");
      router.refresh();
    } catch {
      router.push("/login");
    }
  };

  return (
    <header className="sticky top-0 z-40 h-16 w-full border-b border-border bg-surface/80 backdrop-blur-md transition-colors duration-150">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Left/Start: App Name & Brand Icon */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/sections"
            className="flex items-center gap-2 text-foreground hover:opacity-85 transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          >
            <Image
              src="/logo.png"
              alt="Inventory App"
              width={32}
              height={32}
              priority
              className="h-7 w-auto sm:h-8 object-contain shrink-0"
            />
            <span className="font-semibold text-sm tracking-tight hidden sm:inline-block">
              {tCommon("appName")}
            </span>
          </Link>
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-md mx-auto hidden md:block">
          <SearchBar />
        </div>

        {/* Right/End: Controls (Locale Switcher, Theme Toggle, Logout) */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
          <LocaleSwitcher currentLocale={currentLocale} />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="text-muted hover:text-danger h-8 w-8 p-0"
            title={tNav("logout")}
            aria-label={tNav("logout")}
          >
            <LogOut className="h-4 w-4 rtl:rotate-180" />
          </Button>
        </div>
      </div>
    </header>
  );
}
