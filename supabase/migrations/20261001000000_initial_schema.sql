-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- ==============================================================================
-- 1. TABLES CREATION
-- ==============================================================================

-- 1.1 Sections Table
create table if not exists public.sections (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    name text not null,
    created_at timestamptz not null default now()
);

-- 1.2 Stores Table
create table if not exists public.stores (
    id uuid primary key default gen_random_uuid(),
    section_id uuid not null references public.sections(id) on delete cascade,
    user_id uuid not null references auth.users(id) on delete cascade,
    name text not null,
    created_at timestamptz not null default now()
);

-- 1.3 Products Table
create table if not exists public.products (
    id uuid primary key default gen_random_uuid(),
    store_id uuid not null references public.stores(id) on delete cascade,
    user_id uuid not null references auth.users(id) on delete cascade,
    name text not null,
    notes text,
    photo_url text,
    has_qr boolean not null default false,
    qr_data text,
    created_at timestamptz not null default now()
);

-- 1.4 Recently Viewed Table
create table if not exists public.recently_viewed (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    product_id uuid not null references public.products(id) on delete cascade,
    viewed_at timestamptz not null default now()
);

-- ==============================================================================
-- 2. PERFORMANCE INDEXES
-- ==============================================================================
create index if not exists idx_sections_user_id on public.sections(user_id);
create index if not exists idx_stores_section_id on public.stores(section_id);
create index if not exists idx_stores_user_id on public.stores(user_id);
create index if not exists idx_products_store_id on public.products(store_id);
create index if not exists idx_products_user_id on public.products(user_id);
create index if not exists idx_recently_viewed_user_id on public.recently_viewed(user_id);
create index if not exists idx_recently_viewed_viewed_at on public.recently_viewed(user_id, viewed_at desc);

-- ==============================================================================
-- 3. ROW LEVEL SECURITY (RLS)
-- ==============================================================================
alter table public.sections enable row level security;
alter table public.stores enable row level security;
alter table public.products enable row level security;
alter table public.recently_viewed enable row level security;

-- 3.1 Sections Policies
create policy "Users can select own sections"
    on public.sections for select
    to authenticated
    using (auth.uid() = user_id);

create policy "Users can insert own sections"
    on public.sections for insert
    to authenticated
    with check (auth.uid() = user_id);

create policy "Users can update own sections"
    on public.sections for update
    to authenticated
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "Users can delete own sections"
    on public.sections for delete
    to authenticated
    using (auth.uid() = user_id);

-- 3.2 Stores Policies
create policy "Users can select own stores"
    on public.stores for select
    to authenticated
    using (auth.uid() = user_id);

create policy "Users can insert own stores"
    on public.stores for insert
    to authenticated
    with check (auth.uid() = user_id);

create policy "Users can update own stores"
    on public.stores for update
    to authenticated
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "Users can delete own stores"
    on public.stores for delete
    to authenticated
    using (auth.uid() = user_id);

-- 3.3 Products Policies
create policy "Users can select own products"
    on public.products for select
    to authenticated
    using (auth.uid() = user_id);

create policy "Users can insert own products"
    on public.products for insert
    to authenticated
    with check (auth.uid() = user_id);

create policy "Users can update own products"
    on public.products for update
    to authenticated
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "Users can delete own products"
    on public.products for delete
    to authenticated
    using (auth.uid() = user_id);

-- 3.4 Recently Viewed Policies
create policy "Users can select own recently viewed"
    on public.recently_viewed for select
    to authenticated
    using (auth.uid() = user_id);

create policy "Users can insert own recently viewed"
    on public.recently_viewed for insert
    to authenticated
    with check (auth.uid() = user_id);

create policy "Users can update own recently viewed"
    on public.recently_viewed for update
    to authenticated
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "Users can delete own recently viewed"
    on public.recently_viewed for delete
    to authenticated
    using (auth.uid() = user_id);

-- ==============================================================================
-- 4. STORAGE BUCKET & POLICIES
-- ==============================================================================

-- Create bucket if it doesn't already exist
insert into storage.buckets (id, name, public)
values ('product-photos', 'product-photos', true)
on conflict (id) do nothing;

-- 4.1 Public read access for product photos
create policy "Product photos are publicly accessible"
    on storage.objects for select
    using (bucket_id = 'product-photos');

-- 4.2 Authenticated users can upload only to their own user_id directory
create policy "Users can upload photos to their own folder"
    on storage.objects for insert
    to authenticated
    with check (
        bucket_id = 'product-photos'
        and (storage.foldername(name))[1] = auth.uid()::text
    );

-- 4.3 Users can update their own photos
create policy "Users can update photos in their own folder"
    on storage.objects for update
    to authenticated
    using (
        bucket_id = 'product-photos'
        and (storage.foldername(name))[1] = auth.uid()::text
    );

-- 4.4 Users can delete their own photos
create policy "Users can delete photos in their own folder"
    on storage.objects for delete
    to authenticated
    using (
        bucket_id = 'product-photos'
        and (storage.foldername(name))[1] = auth.uid()::text
    );
