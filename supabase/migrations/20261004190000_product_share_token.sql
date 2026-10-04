-- ==============================================================================
-- Add share_token to products for public read-only QR code sharing
-- ==============================================================================

-- 1. Add share_token column to products table
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS share_token text UNIQUE DEFAULT NULL;

-- 2. Create partial index for fast lookup where share_token IS NOT NULL
CREATE INDEX IF NOT EXISTS idx_products_share_token ON public.products(share_token) WHERE share_token IS NOT NULL;

-- 3. RLS policy: allow public SELECT on products where share_token is present
CREATE POLICY "Public read products via share_token"
    ON public.products FOR SELECT
    TO anon, authenticated
    USING (share_token IS NOT NULL);

-- 4. RLS policy: allow public SELECT on stores linked to shared products
CREATE POLICY "Public read stores via product share_token"
    ON public.stores FOR SELECT
    TO anon, authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.products
            WHERE products.store_id = stores.id
              AND products.share_token IS NOT NULL
        )
    );

-- 5. RLS policy: allow public SELECT on sections linked to shared products
CREATE POLICY "Public read sections via product share_token"
    ON public.sections FOR SELECT
    TO anon, authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.stores
            JOIN public.products ON products.store_id = stores.id
            WHERE stores.section_id = sections.id
              AND products.share_token IS NOT NULL
        )
    );
