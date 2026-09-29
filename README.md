## The Aluna — Hotel Booking Website

Multi-property boutique guest house site. Guests browse properties, view
rooms, and send a booking inquiry (no online payment yet — inquiries are
followed up manually).

- **Framework**: Next.js (App Router) + TypeScript + Tailwind CSS
- **Hosting**: Vercel
- **Database**: Supabase (Postgres), optional for local dev

### Project structure

Both the brand site and each property are **single scrolling pages**, like
the reference site: the navbar links are anchors (`#about`, `#gallery`, ...)
that scroll to a section on that same page, not separate routes.

```
app/
  page.tsx                          Brand homepage: hero, #about, #locations
                                     (every property), #gallery, #contact
  properties/[slug]/
    layout.tsx                      Fetches the property, renders its navbar/footer
    page.tsx                        Renders <PropertyLanding>
  api/inquiries/route.ts            Validates + inserts inquiries into Supabase
components/
  property-landing.tsx              A property's full page: hero, #about, room
                                     carousel, #rooms, amenities, #gallery, #contact
                                     (inquiry form inline)
  navbar.tsx, footer.tsx, reveal.tsx (scroll-in animation),
  feature-carousel.tsx, room-card.tsx, gallery-grid.tsx,
  amenities-list.tsx, inquiry-form.tsx
lib/
  brand.ts                          Brand-level copy (name, tagline, hero image) for "/"
  data.ts                           Data access layer (Supabase, falls back to mock data)
  mock-data.ts                      Sample property/room data for local dev
  supabase/                         Supabase client factories
supabase/schema.sql                 Table definitions, RLS policies, and seed data
```

### Local development

```bash
npm install
npm run dev
```

The app works out of the box with **mock data** (`lib/mock-data.ts`) even
without a Supabase project — useful for building/reviewing UI first.

### Connecting Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run `supabase/schema.sql`. This creates the
   `properties`, `room_types`, and `inquiries` tables with row-level security
   (public read on properties/room_types, public insert-only on inquiries)
   and inserts one sample property with two rooms.
3. Copy `.env.example` to `.env.local` and fill in the values from
   **Project Settings → API**:

   ```bash
   cp .env.example .env.local
   ```

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```

4. Restart `npm run dev`. Pages now read live data from Supabase instead of
   the mock data.
5. Manage properties, room types, and prices directly from the Supabase
   **Table Editor** — there's no admin dashboard yet by design (see below).

To add more properties, insert rows into `properties` / `room_types` via the
Supabase Table Editor. They'll appear automatically in the homepage's
"Our Locations" section and at `/properties/<slug>`.

### Viewing inquiries

Booking inquiries submitted through the contact form are stored in the
`inquiries` table. View them in the Supabase Table Editor or SQL editor —
there's currently no admin UI or automatic email notification.

### Deploying to Vercel

1. Push this repo to GitHub.
2. Import it in [Vercel](https://vercel.com/new).
3. Add the same two environment variables (`NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in the Vercel project settings.
4. Deploy.

### Not built yet (out of scope for this pass)

- Admin dashboard (managing properties/rooms/inquiries is done via Supabase directly)
- Real-time room availability and online payment — booking is inquiry-only
- Authentication for guests or staff
