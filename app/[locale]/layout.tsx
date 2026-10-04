import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { inter, ibmPlexSansArabic } from "@/lib/fonts";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/toast";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Inventory App",
  description: "High-precision warehouse and inventory management platform",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const isRtl = locale === "ar";
  const dir = isRtl ? "rtl" : "ltr";
  const fontVariableClass = `${inter.variable} ${ibmPlexSansArabic.variable}`;
  const fontClass = isRtl ? "font-arabic" : "font-sans";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${fontVariableClass} ${fontClass}`}
      suppressHydrationWarning
    >
      <body className={`min-h-screen bg-bg text-foreground antialiased selection:bg-accent/15 selection:text-accent ${fontClass}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
