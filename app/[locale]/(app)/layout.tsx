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
    <div className="relative min-h-screen pb-24">
      {children}
      <RecentlyViewedBar />
    </div>
  );
}
