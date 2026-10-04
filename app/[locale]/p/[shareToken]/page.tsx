import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/server";
import { ChevronRight, ImageIcon, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PublicProductPageProps {
  params: Promise<{
    locale: string;
    shareToken: string;
  }>;
}

export async function generateMetadata({
  params,
}: PublicProductPageProps): Promise<Metadata> {
  const { locale, shareToken } = await params;
  if (!routing.locales.includes(locale as "en" | "ar")) {
    return { title: "Inventory App" };
  }
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "publicProduct" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("name, notes")
    .eq("share_token", shareToken)
    .maybeSingle();

  if (!product) {
    return {
      title: `${t("notFoundTitle")} - ${tCommon("appName")}`,
      description: t("notFoundDescription"),
    };
  }

  return {
    title: `${product.name} - ${tCommon("appName")}`,
    description: product.notes || undefined,
  };
}

export default async function PublicProductPage({
  params,
}: PublicProductPageProps) {
  const { locale, shareToken } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "publicProduct" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const supabase = await createClient();

  // Query ONLY public fields - strictly no user_id, created_at, or internal IDs
  const { data: product } = await supabase
    .from("products")
    .select(
      `
      name,
      notes,
      photo_url,
      stores (
        name,
        sections (
          name
        )
      )
    `
    )
    .eq("share_token", shareToken)
    .maybeSingle();

  // Clean 404 state if product is not found or QR is invalid
  if (!product) {
    return (
      <div className="min-h-screen bg-bg text-foreground flex flex-col justify-between p-4 sm:p-6 lg:p-8">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-sm text-center space-y-6 animate-in fade-in-50 duration-200">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface border border-border shadow-soft text-muted">
              <QrCode className="h-8 w-8 text-accent/80" />
            </div>
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {t("notFoundTitle")}
              </h1>
              <p className="text-xs sm:text-sm text-muted max-w-xs mx-auto leading-relaxed">
                {t("notFoundDescription")}
              </p>
            </div>
            <div className="pt-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/login" className="inline-flex items-center gap-1.5">
                  <span>{t("signIn")}</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <footer className="pt-6 pb-2 text-center border-t border-border/40">
          <Link
            href="/login"
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            {t("poweredBy", { appName: tCommon("appName") })}
          </Link>
        </footer>
      </div>
    );
  }

  // Safely extract hierarchy without leaking internal identifiers
  type StoreRelation = {
    name: string;
    sections?: { name: string } | Array<{ name: string }> | null;
  };

  const rawStore = product.stores as unknown as StoreRelation | StoreRelation[] | null;
  const store = Array.isArray(rawStore) ? rawStore[0] : rawStore;
  const storeName = store?.name;

  const rawSection = store?.sections;
  const section = Array.isArray(rawSection) ? rawSection[0] : rawSection;
  const sectionName = section?.name;

  return (
    <div className="min-h-screen bg-bg text-foreground flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8">
      <main className="mx-auto w-full max-w-md sm:max-w-xl space-y-6 text-start animate-in fade-in-50 duration-200">
        {/* Breadcrumb: Section name > Store name */}
        {(sectionName || storeName) && (
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-muted pt-2"
          >
            {sectionName && (
              <span className="truncate max-w-[140px] sm:max-w-[200px]">
                {sectionName}
              </span>
            )}
            {sectionName && storeName && (
              <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-40 rtl:rotate-180" />
            )}
            {storeName && (
              <span className="text-foreground/85 font-medium truncate max-w-[140px] sm:max-w-[200px]">
                {storeName}
              </span>
            )}
          </nav>
        )}

        {/* Large Product Photo */}
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-secondary/30 shadow-soft flex items-center justify-center">
          {product.photo_url ? (
            <img
              src={product.photo_url}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-muted/40">
              <ImageIcon className="h-16 w-16 sm:h-20 sm:w-20 stroke-[1.2]" />
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground break-words">
            {product.name}
          </h1>

          <div className="text-sm sm:text-base text-muted max-w-prose leading-relaxed whitespace-pre-line break-words">
            {product.notes || t("noNotes")}
          </div>
        </div>
      </main>

      {/* Powered by Footer */}
      <footer className="mt-12 pt-6 pb-2 border-t border-border/40 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
        >
          <span>{t("poweredBy", { appName: tCommon("appName") })}</span>
        </Link>
      </footer>
    </div>
  );
}
