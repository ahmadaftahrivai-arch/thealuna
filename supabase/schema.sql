-- Run this in the Supabase SQL editor (or via `supabase db push`) to set up
-- the tables this app reads from and writes to.

create extension if not exists "pgcrypto";

create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  location text not null,
  tagline text not null default '',
  description text not null default '',
  cover_image text not null default '',
  amenities text[] not null default '{}',
  gallery text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists room_types (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties (id) on delete cascade,
  name text not null,
  description text not null default '',
  price numeric(12, 2) not null,
  capacity int not null default 2,
  images text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties (id) on delete cascade,
  room_type_id uuid references room_types (id) on delete set null,
  name text not null,
  email text not null,
  phone text not null,
  check_in date not null,
  check_out date not null,
  guests int not null default 1,
  message text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists room_types_property_id_idx on room_types (property_id);
create index if not exists inquiries_property_id_idx on inquiries (property_id);

-- Row Level Security: properties and room_types are public read-only content.
-- inquiries is public insert-only (no admin dashboard yet, so no public read
-- policy is defined -- data is viewable via the Supabase dashboard/table editor
-- until an authenticated admin panel is built).

alter table properties enable row level security;
alter table room_types enable row level security;
alter table inquiries enable row level security;

create policy "Public read access to properties"
  on properties for select
  using (true);

create policy "Public read access to room types"
  on room_types for select
  using (true);

create policy "Public insert access to inquiries"
  on inquiries for insert
  with check (true);

-- Sample seed data. Feel free to edit or remove before going live.
insert into properties (slug, name, location, tagline, description, cover_image, amenities, gallery)
values (
  'the-aluna-bali',
  'The Aluna',
  'Canggu, Bali',
  'A Cozy Guest House',
  'Where island calm meets everyday comfort. The Aluna is a boutique guest house built for those who travel slowly.',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945',
  array['Free Wi-Fi', 'Airport Shuttle', 'Daily Housekeeping', 'Private Parking', 'Breakfast Included'],
  array[
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd',
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'
  ]
)
on conflict (slug) do nothing;

insert into room_types (property_id, name, description, price, capacity, images)
select id, 'Deluxe Room', 'Soft linens, warm teak wood, and a private courtyard view.', 750000, 2,
  array['https://images.unsplash.com/photo-1611892440504-42a792e24d32']
from properties where slug = 'the-aluna-bali'
on conflict do nothing;

insert into room_types (property_id, name, description, price, capacity, images)
select id, 'Family Suite', 'Extra space with a kitchenette, ideal for longer stays.', 1200000, 4,
  array['https://images.unsplash.com/photo-1618773928121-c32242e63f39']
from properties where slug = 'the-aluna-bali'
on conflict do nothing;
