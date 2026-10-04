import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { RecentlyViewedBar } from "@/components/RecentlyViewedBar";

export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="relative min-h-screen pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))]">
      {children}
      <RecentlyViewedBar />
    </div>
  );
}
