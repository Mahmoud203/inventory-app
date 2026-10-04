"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ProductForm, type InitialProductData } from "@/components/ProductForm";

interface ProductFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  storeId: string;
  initialProduct?: InitialProductData | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ProductFormModal({
  open,
  onOpenChange,
  storeId,
  initialProduct,
  onSuccess,
  onCancel,
}: ProductFormModalProps) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="full"
          className="w-full h-full p-4 sm:p-6 overflow-y-auto"
          style={{
            paddingTop: "max(1.25rem, env(safe-area-inset-top, 0px))",
            paddingBottom: "max(1.25rem, env(safe-area-inset-bottom, 0px))",
          }}
        >
          <ProductForm
            storeId={storeId}
            initialProduct={initialProduct}
            onSuccess={onSuccess}
            onCancel={onCancel}
          />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl">
        <ProductForm
          storeId={storeId}
          initialProduct={initialProduct}
          onSuccess={onSuccess}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
