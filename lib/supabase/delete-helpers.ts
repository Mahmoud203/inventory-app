import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

/**
 * Extracts the storage object path inside the "product-photos" bucket
 * from a public or relative photo URL.
 *
 * Example public URL:
 * https://<project>.supabase.co/storage/v1/object/public/product-photos/user-uuid/image.jpg
 * Returns: "user-uuid/image.jpg"
 */
export function extractStoragePath(photoUrl: string | null | undefined): string | null {
  if (!photoUrl || typeof photoUrl !== "string") return null;

  const trimmed = photoUrl.trim();
  const marker = "/product-photos/";
  const markerIndex = trimmed.indexOf(marker);

  if (markerIndex !== -1) {
    const rawPath = trimmed.slice(markerIndex + marker.length);
    // Strip query strings or fragment identifiers if any
    const cleanPath = rawPath.split("?")[0].split("#")[0];
    try {
      return decodeURIComponent(cleanPath);
    } catch {
      return cleanPath;
    }
  }

  // If already stored as a relative path inside bucket
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
    return trimmed;
  }

  return null;
}

/**
 * Removes a list of photo URLs from the "product-photos" Supabase Storage bucket.
 */
export async function deleteProductPhotosFromStorage(
  supabase: SupabaseClient<Database>,
  photoUrls: (string | null | undefined)[]
): Promise<void> {
  const paths = Array.from(
    new Set(
      photoUrls
        .map((url) => extractStoragePath(url))
        .filter((path): path is string => !!path && path.length > 0)
    )
  );

  if (paths.length === 0) return;

  try {
    // Storage .remove accepts an array of file paths
    const { error } = await supabase.storage.from("product-photos").remove(paths);
    if (error) {
      console.warn("Non-fatal storage cleanup warning:", error.message);
    }
  } catch (err) {
    console.warn("Storage cleanup exception (non-fatal):", err);
  }
}

/**
 * Deletes a store and cleans up all associated product photos from storage.
 * In Postgres, ON DELETE CASCADE handles deleting related products and recently_viewed rows.
 */
export async function deleteStoreWithStorage(
  supabase: SupabaseClient<Database>,
  storeId: string
): Promise<void> {
  // 1. Fetch photo URLs for all products in this store
  const { data: products, error: fetchError } = await supabase
    .from("products")
    .select("photo_url")
    .eq("store_id", storeId);

  if (fetchError) {
    throw fetchError;
  }

  // 2. Remove all product photos from Supabase Storage
  if (products && products.length > 0) {
    const photoUrls = products.map((p) => p.photo_url);
    await deleteProductPhotosFromStorage(supabase, photoUrls);
  }

  // 3. Delete store record (cascades to products in DB)
  const { error: deleteError } = await supabase
    .from("stores")
    .delete()
    .eq("id", storeId);

  if (deleteError) {
    throw deleteError;
  }
}

/**
 * Deletes a section and cleans up all associated product photos across all its stores.
 * In Postgres, ON DELETE CASCADE handles deleting related stores, products, and recently_viewed rows.
 */
export async function deleteSectionWithStorage(
  supabase: SupabaseClient<Database>,
  sectionId: string
): Promise<void> {
  // 1. Find all stores belonging to this section
  const { data: stores, error: storesError } = await supabase
    .from("stores")
    .select("id")
    .eq("section_id", sectionId);

  if (storesError) {
    throw storesError;
  }

  const storeIds = (stores || []).map((s) => s.id);

  // 2. If there are stores, find all products and their photos
  if (storeIds.length > 0) {
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("photo_url")
      .in("store_id", storeIds);

    if (productsError) {
      throw productsError;
    }

    if (products && products.length > 0) {
      const photoUrls = products.map((p) => p.photo_url);
      await deleteProductPhotosFromStorage(supabase, photoUrls);
    }
  }

  // 3. Delete the section (cascades to stores and products in DB)
  const { error: deleteError } = await supabase
    .from("sections")
    .delete()
    .eq("id", sectionId);

  if (deleteError) {
    throw deleteError;
  }
}
