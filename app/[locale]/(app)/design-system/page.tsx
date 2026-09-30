"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  PackageOpen,
  Plus,
  Send,
  Trash2,
  Settings,
  User,
  Sliders,
  Bell,
  Box,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LocaleSwitcher } from "@/components/ui/locale-switcher";

export default function DesignSystemPage() {
  const t = useTranslations("designSystem");
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const isAr = locale === "ar";

  // Checkbox and dropdown menu demo states
  const [checkedBox, setCheckedBox] = React.useState<boolean>(true);
  const [dropdownCheck, setDropdownCheck] = React.useState<boolean>(true);
  const [dropdownRadio, setDropdownRadio] = React.useState<string>("compact");

  return (
    <div className="min-h-screen bg-bg text-foreground px-4 py-12 sm:px-8 lg:px-12 transition-colors duration-150">
      {/* Top Header & Toolbar */}
      <header className="mx-auto max-w-6xl pb-8 border-b border-border/80 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 rounded-sm bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
              <Sparkles className="h-3 w-3" />
              {t("badge")}
            </span>
            <span className="text-xs text-muted">v1.0.0</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {t("title")}
          </h1>
          <p className="mt-1 text-sm text-muted max-w-2xl leading-relaxed">
            {t("description")}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <ThemeToggle />
          <LocaleSwitcher currentLocale={locale} />
        </div>
      </header>

      <main className="mx-auto max-w-6xl py-10 space-y-16">
        {/* 1. Theme Tokens & Swatches */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-accent" />
            <h2 className="text-xl font-semibold tracking-tight">
              {t("colorTokens")}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 text-xs">
            <div className="rounded-md border border-border p-3 bg-bg">
              <div className="font-semibold">bg</div>
              <div className="text-muted text-[10px] mt-1">#FAFAFA / #0A0A0A</div>
            </div>
            <div className="rounded-md border border-border p-3 bg-surface shadow-soft">
              <div className="font-semibold">surface</div>
              <div className="text-muted text-[10px] mt-1">#FFFFFF / #141414</div>
            </div>
            <div className="rounded-md border border-border p-3 bg-secondary">
              <div className="font-semibold">border</div>
              <div className="text-muted text-[10px] mt-1">#E5E5E5 / #262626</div>
            </div>
            <div className="rounded-md border border-border p-3 bg-muted/10">
              <div className="font-semibold text-muted">muted</div>
              <div className="text-muted text-[10px] mt-1">#737373 / #A3A3A3</div>
            </div>
            <div className="rounded-md p-3 bg-accent text-accent-foreground shadow-soft">
              <div className="font-semibold">accent</div>
              <div className="opacity-80 text-[10px] mt-1">#4F46E5</div>
            </div>
            <div className="rounded-md p-3 bg-success text-success-foreground">
              <div className="font-semibold">success</div>
              <div className="opacity-80 text-[10px] mt-1">#16A34A</div>
            </div>
            <div className="rounded-md p-3 bg-warning text-warning-foreground">
              <div className="font-semibold">warning</div>
              <div className="opacity-80 text-[10px] mt-1">#D97706</div>
            </div>
            <div className="rounded-md p-3 bg-danger text-danger-foreground">
              <div className="font-semibold">danger</div>
              <div className="opacity-80 text-[10px] mt-1">#DC2626</div>
            </div>
          </div>
        </section>

        {/* 2. Buttons */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-border/40 pb-2">
            <h2 className="text-xl font-semibold tracking-tight">
              {t("buttons")}
            </h2>
            <span className="text-xs text-muted">{t("buttonsSubtitle")}</span>
          </div>

          <div className="space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted">
              {t("variantsSizes")}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" size="sm">
                Primary (sm)
              </Button>
              <Button variant="primary" size="md">
                Primary (md)
              </Button>
              <Button variant="primary" size="lg">
                Primary (lg)
              </Button>

              <Button variant="secondary" size="md">
                Secondary
              </Button>
              <Button variant="outline" size="md">
                Outline
              </Button>
              <Button variant="ghost" size="md">
                Ghost
              </Button>
              <Button variant="danger" size="md">
                <Trash2 className="h-4 w-4 me-1.5" />
                Danger
              </Button>
            </div>

            <div className="text-xs font-semibold uppercase tracking-wider text-muted pt-2">
              {isAr ? "حالات التفاعل (Hover / Active / Loading / Disabled)" : "Interactive States"}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" isLoading size="md">
                Loading State
              </Button>
              <Button variant="secondary" isLoading size="md">
                Syncing
              </Button>
              <Button variant="primary" disabled size="md">
                Disabled Primary
              </Button>
              <Button variant="outline" disabled size="md">
                Disabled Outline
              </Button>
              <Button variant="outline" size="md" className="gap-2">
                <Send className="h-4 w-4" />
                With Icon
              </Button>
            </div>
          </div>
        </section>

        {/* 3. Form Inputs & Controls */}
        <section className="space-y-6">
          <div className="border-b border-border/40 pb-2">
            <h2 className="text-xl font-semibold tracking-tight">
              {isAr ? "النماذج والحقول (Form Controls)" : "Inputs, Textarea & Checkbox"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 rounded-lg border border-border p-6 bg-surface shadow-soft">
              <div className="space-y-2">
                <Label htmlFor="demo-input-normal">
                  {isAr ? "اسم المستودع" : "Warehouse Name"}
                </Label>
                <Input
                  id="demo-input-normal"
                  placeholder={isAr ? "مثال: المستودع المركزي ب" : "e.g. Central Logistics Hub B"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="demo-input-error">
                  {isAr ? "الرمز الشريطي (مع حالة خطأ)" : "Barcode SKU (Error State)"}
                </Label>
                <Input
                  id="demo-input-error"
                  defaultValue="INV-INVALID-99"
                  error
                />
                <p className="text-xs text-danger">
                  {isAr ? "رمز غير صالح أو مكرر" : "Invalid or duplicate SKU code."}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="demo-input-disabled">
                  {isAr ? "حقل معطل (Disabled)" : "Read-only / Disabled Field"}
                </Label>
                <Input
                  id="demo-input-disabled"
                  disabled
                  defaultValue="SYSTEM-LOCKED-RECORD"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Checkbox
                  id="demo-checkbox"
                  checked={checkedBox}
                  onCheckedChange={(val) => setCheckedBox(!!val)}
                />
                <Label htmlFor="demo-checkbox" className="cursor-pointer">
                  {isAr ? "تفعيل المزامنة الفورية للمخزون" : "Enable real-time inventory sync"}
                </Label>
              </div>
            </div>

            <div className="space-y-4 rounded-lg border border-border p-6 bg-surface shadow-soft">
              <div className="space-y-2">
                <Label htmlFor="demo-textarea">
                  {isAr ? "ملاحظات الشحنة" : "Dispatch & Receiving Notes"}
                </Label>
                <Textarea
                  id="demo-textarea"
                  rows={4}
                  placeholder={
                    isAr
                      ? "أدخل تعليمات الفحص وموقع التخزين المخصص..."
                      : "Enter inspection requirements or shelf allocation notes..."
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="demo-textarea-error">
                  {isAr ? "حقل نصي مع حالة خطأ" : "Textarea (Error State)"}
                </Label>
                <Textarea
                  id="demo-textarea-error"
                  error
                  rows={2}
                  defaultValue={isAr ? "تجاوز الحد الأقصى للأحرف" : "Exceeded character threshold."}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Cards */}
        <section className="space-y-6">
          <div className="border-b border-border/40 pb-2">
            <h2 className="text-xl font-semibold tracking-tight">
              {isAr ? "البطاقات والتخطيط (Card Slots)" : "Card Primitive"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{isAr ? "سعة المستودع" : "Warehouse Capacity"}</CardTitle>
                <CardDescription>
                  {isAr ? "إجمالي استيعاب الرفوف الحالي" : "Current volumetric shelf occupation"}
                </CardDescription>
              </CardHeader>
              <CardBody>
                <div className="text-2xl font-bold text-foreground">84.2%</div>
                <p className="mt-1 text-xs text-muted">14,280 / 17,000 pallets in place</p>
                <div className="mt-4 h-2 w-full rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-accent w-[84%]" />
                </div>
              </CardBody>
              <CardFooter className="justify-between">
                <span className="text-xs text-muted">Updated 2m ago</span>
                <Button variant="ghost" size="sm">
                  {isAr ? "تفاصيل" : "Details"}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{isAr ? "الطلبات النشطة" : "Active Dispatches"}</CardTitle>
                <CardDescription>
                  {isAr ? "قيد التجهيز في الممرات" : "Orders staging on shipping docks"}
                </CardDescription>
              </CardHeader>
              <CardBody>
                <div className="text-2xl font-bold text-success">342</div>
                <p className="mt-1 text-xs text-muted">98.4% on-schedule dispatch rate</p>
                <div className="mt-4 flex gap-1.5">
                  <span className="inline-flex items-center rounded-sm bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                    312 In Flight
                  </span>
                  <span className="inline-flex items-center rounded-sm bg-warning/10 px-2 py-0.5 text-xs font-medium text-warning">
                    30 Queued
                  </span>
                </div>
              </CardBody>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  {isAr ? "إدارة الطلبات" : "Manage Queue"}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{isAr ? "تنبيهات انخفاض المخزون" : "Reorder Thresholds"}</CardTitle>
                <CardDescription>
                  {isAr ? "منتجات تحتاج إلى إعادة توريد" : "SKUs reaching minimum quantity"}
                </CardDescription>
              </CardHeader>
              <CardBody>
                <div className="text-2xl font-bold text-danger">12 SKUs</div>
                <p className="mt-1 text-xs text-muted">Immediate vendor replenishment required</p>
                <div className="mt-4 text-xs space-y-1.5">
                  <div className="flex justify-between border-b border-border/40 pb-1">
                    <span>Steel Pallet Racks</span>
                    <span className="font-semibold text-danger">2 left</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hydraulic Seals B-10</span>
                    <span className="font-semibold text-warning">5 left</span>
                  </div>
                </div>
              </CardBody>
              <CardFooter>
                <Button variant="danger" size="sm" className="w-full">
                  {isAr ? "إنشاء طلب توريد" : "Trigger Replenish"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* 5. Navigation, Breadcrumbs, Tabs & DropdownMenu */}
        <section className="space-y-6">
          <div className="border-b border-border/40 pb-2">
            <h2 className="text-xl font-semibold tracking-tight">
              {isAr ? "التنقل وعلامات التبويب والقوائم" : "Navigation, Tabs & Dropdowns"}
            </h2>
          </div>

          <div className="space-y-6 rounded-lg border border-border p-6 bg-surface shadow-soft">
            {/* Breadcrumb */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-muted uppercase tracking-wider">
                Breadcrumb
              </div>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">
                      {isAr ? "الرئيسية" : "Inventory"}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">
                      {isAr ? "الأقسام" : "Sections"}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">
                      {isAr ? "القسم الشمالي A" : "Aisle 04-North"}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {isAr ? "الرف 12" : "Bin Shelf 12B"}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="h-px bg-border" />

            {/* Tabs */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-muted uppercase tracking-wider">
                Tabs
              </div>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList>
                  <TabsTrigger value="overview">
                    {isAr ? "نظرة عامة" : "Overview"}
                  </TabsTrigger>
                  <TabsTrigger value="analytics">
                    {isAr ? "التحليلات" : "Analytics"}
                  </TabsTrigger>
                  <TabsTrigger value="audit">
                    {isAr ? "سجل التدقيق" : "Audit Trail"}
                  </TabsTrigger>
                  <TabsTrigger value="settings">
                    {isAr ? "الإعدادات" : "Settings"}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="rounded-md border border-border p-4 bg-bg text-xs">
                  {isAr
                    ? "عرض شامل لمخزون المستودع وجداول التوريد الأسبوعية."
                    : "Comprehensive overview of inventory turnover, staging dock readiness, and inbound shipments."}
                </TabsContent>
                <TabsContent value="analytics" className="rounded-md border border-border p-4 bg-bg text-xs">
                  {isAr ? "بيانات الأداء والمؤشرات اللوجستية." : "Throughput, pick rates, and lead time metrics."}
                </TabsContent>
                <TabsContent value="audit" className="rounded-md border border-border p-4 bg-bg text-xs">
                  {isAr ? "سجل التدقيق لجميع التعديلات والعمليات." : "Immutable transaction log of barcode scans and stock reconciliations."}
                </TabsContent>
                <TabsContent value="settings" className="rounded-md border border-border p-4 bg-bg text-xs">
                  {isAr ? "إعدادات المستودع ونقاط إعادة الطلب." : "Threshold rules, automated alerts, and API webhooks."}
                </TabsContent>
              </Tabs>
            </div>

            <div className="h-px bg-border" />

            {/* Dropdown Menu */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-muted uppercase tracking-wider">
                Dropdown Menu
              </div>
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Sliders className="h-3.5 w-3.5" />
                      {isAr ? "خيارات العرض" : "View Options"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuLabel>
                      {isAr ? "تخصيص الواجهة" : "Display Preferences"}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={dropdownCheck}
                      onCheckedChange={(val) => setDropdownCheck(!!val)}
                    >
                      {isAr ? "إظهار الأرصدة الصفرية" : "Show Zero-Balance SKUs"}
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>
                      {isAr ? "كثافة الجدول" : "Table Density"}
                    </DropdownMenuLabel>
                    <DropdownMenuRadioGroup value={dropdownRadio} onValueChange={setDropdownRadio}>
                      <DropdownMenuRadioItem value="compact">
                        {isAr ? "مضغوط (Compact)" : "Compact"}
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="spacious">
                        {isAr ? "موسع (Spacious)" : "Spacious"}
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="danger">
                      <Trash2 className="h-3.5 w-3.5 me-2" />
                      {isAr ? "إعادة تعيين المرشحات" : "Reset Filters"}
                      <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="sm" className="gap-2">
                      <User className="h-3.5 w-3.5" />
                      {isAr ? "حساب المشرف" : "Operator Profile"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>
                      {isAr ? "المستخدم" : "Mahmoud (Lead Admin)"}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="h-3.5 w-3.5 me-2" />
                      {isAr ? "إعدادات الحساب" : "Account Settings"}
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell className="h-3.5 w-3.5 me-2" />
                      {isAr ? "الإشعارات" : "Alert Preferences"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Overlays: Dialog, Sheet & Drawer */}
        <section className="space-y-6">
          <div className="border-b border-border/40 pb-2">
            <h2 className="text-xl font-semibold tracking-tight">
              {isAr ? "النوافذ المنبثقة واللوحات (Dialog, Sheet & Drawer)" : "Overlays (Dialog, Sheet, Drawer)"}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Modal Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="primary" size="md">
                  <Box className="h-4 w-4 me-2" />
                  {isAr ? "فتح نافذة حوار (Dialog)" : "Open Modal Dialog"}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {isAr ? "إضافة قسم جديد في المستودع" : "Register New Warehouse Bay"}
                  </DialogTitle>
                  <DialogDescription>
                    {isAr
                      ? "أدخل تفاصيل الترقيم والباركود المخصص للقسم الجديد."
                      : "Define aisle identifiers, maximum load capacity, and QR coordinates."}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 py-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="bay-id">{isAr ? "معرف القسم" : "Bay Identifier"}</Label>
                    <Input id="bay-id" placeholder="BAY-E14" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="bay-notes">{isAr ? "ملاحظات إضافية" : "Rack Type"}</Label>
                    <Input id="bay-notes" placeholder="Heavy Duty Steel Pallet" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" size="sm">
                      {isAr ? "إلغاء" : "Cancel"}
                    </Button>
                  </DialogClose>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      toast.success(
                        isAr ? "تم حفظ القسم بنجاح" : "Warehouse Bay registered"
                      );
                    }}
                  >
                    {isAr ? "حفظ التغييرات" : "Save Changes"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Side Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="md">
                  {isAr ? "لوحة جانبية (Sheet)" : "Open Side Sheet"}
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>
                    {isAr ? "تفاصيل الصنف المخزني" : "SKU Detailed Inspection"}
                  </SheetTitle>
                  <SheetDescription>
                    {isAr
                      ? "المعلومات اللوجستية وتاريخ حركات التخزين"
                      : "Batch codes, dimensional metrics, and temperature tolerances."}
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-4 text-xs">
                  <div className="rounded-md border border-border p-3 bg-secondary/30">
                    <div className="font-semibold text-foreground">SKU: IND-9042-X</div>
                    <div className="text-muted mt-1">Location: Aisle 3 / Shelf D2</div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>{isAr ? "تعديل الحد الأدنى" : "Safety Stock Level"}</Label>
                    <Input defaultValue="250 units" />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="primary" size="sm" className="w-full">
                      {isAr ? "تطبيق وتحديث" : "Apply Changes"}
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            {/* Bottom Drawer */}
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="secondary" size="md">
                  {isAr ? "درج سفلي (Drawer)" : "Open Bottom Drawer"}
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>
                    {isAr ? "إجراء سريع - مسح باركود الشحنة" : "Quick Action - Scan & Dispatch"}
                  </DrawerTitle>
                  <DrawerDescription>
                    {isAr
                      ? "مرر ماسح الباركود أو أدخل المعرف يدويًا"
                      : "Ready for high-speed terminal input or mobile scanner link."}
                  </DrawerDescription>
                </DrawerHeader>
                <div className="py-4 max-w-md mx-auto space-y-3">
                  <Input placeholder="Scan barcode with optical reader..." autoFocus />
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full"
                    onClick={() => toast.info(isAr ? "تم قراءة الكود بنجاح" : "Barcode recognized")}
                  >
                    {isAr ? "تأكيد المناولة" : "Confirm Dispatch"}
                  </Button>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="ghost" size="sm">
                      {isAr ? "إغلاق" : "Close"}
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </section>

        {/* 7. Toast wrapper (sonner) */}
        <section className="space-y-6">
          <div className="border-b border-border/40 pb-2">
            <h2 className="text-xl font-semibold tracking-tight">
              {isAr ? "نظام الإشعارات (Toasts / Sonner)" : "Toast Notifications (Sonner)"}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                toast.success(isAr ? "تم تحديث المخزون بنجاح" : "Inventory Synced", {
                  description: isAr
                    ? "تم تسجيل 120 وحدة جديدة في الرف B-4"
                    : "120 units reconciled across active shelves.",
                })
              }
            >
              <CheckCircle2 className="h-4 w-4 text-success me-1.5" />
              Success Toast
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                toast.error(isAr ? "خطأ في الاتصال بالماسح" : "Scan Error", {
                  description: isAr
                    ? "تعذر التحقق من التوقيع الرقمي للباركود"
                    : "Barcode check-digit mismatch. Rescan item.",
                })
              }
            >
              <XCircle className="h-4 w-4 text-danger me-1.5" />
              Error Toast
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                toast.warning(isAr ? "تحذير: سعة المخزن قاربت على الامتلاء" : "High Capacity Alert", {
                  description: isAr
                    ? "القسم C وصل إلى 94% من طاقته القصوى"
                    : "Section C utilization has breached 94%.",
                })
              }
            >
              <AlertTriangle className="h-4 w-4 text-warning me-1.5" />
              Warning Toast
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                toast.info(isAr ? "بدء المزامنة التلقائية" : "Batch Sync Started", {
                  description: isAr
                    ? "جاري مزامنة 1,420 صنف مع النظام السحابي"
                    : "Syncing 1,420 items with warehouse cloud broker.",
                })
              }
            >
              <Info className="h-4 w-4 text-accent me-1.5" />
              Info Toast
            </Button>
          </div>
        </section>

        {/* 8. Skeleton & EmptyState */}
        <section className="space-y-6">
          <div className="border-b border-border/40 pb-2">
            <h2 className="text-xl font-semibold tracking-tight">
              {isAr ? "حالات التحميل والبيانات الفارغة" : "Skeleton & Empty State"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skeleton Card */}
            <div className="rounded-lg border border-border p-6 bg-surface shadow-soft space-y-4">
              <div className="text-xs font-semibold text-muted uppercase tracking-wider">
                Skeleton Loading State
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-24 w-full" />
              <div className="flex justify-end gap-2 pt-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>

            {/* Empty State */}
            <div>
              <EmptyState
                icon={PackageOpen}
                title={isAr ? "لا توجد بضائع في هذا القسم" : "No items found in this section"}
                description={
                  isAr
                    ? "لم يتم تعيين أي منتجات أو حاويات لهذا القسم بعد. يمكنك إضافة صنف جديد الآن."
                    : "This storage bay is currently unoccupied. Register your first item to start tracking."
                }
                action={
                  <Button variant="primary" size="sm" className="gap-1.5">
                    <Plus className="h-3.5 w-3.5" />
                    {isAr ? "إضافة صنف جديد" : "Add New SKU"}
                  </Button>
                }
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
