import type { Property, RoomType } from "./types";

// Used when NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not
// set, so the app is browsable before a Supabase project exists. Mirrors the
// seed data in supabase/schema.sql.

export const mockProperties: Property[] = [
  {
    id: "mock-the-aluna-bali",
    slug: "the-aluna-bali",
    name: "The Aluna",
    location: "Canggu, Bali",
    tagline: "A Cozy Guest House",
    description:
      "Where island calm meets everyday comfort. The Aluna is a boutique guest house built for those who travel slowly — sunlit rooms, a quiet courtyard, and spaces that feel like they've always been yours.",
    cover_image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop",
    amenities: [
      "Free Wi-Fi",
      "Airport Shuttle",
      "Daily Housekeeping",
      "Private Parking",
      "Breakfast Included",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "mock-the-aluna-ubud",
    slug: "the-aluna-ubud",
    name: "The Aluna Ubud",
    location: "Ubud, Bali",
    tagline: "Designed for Slow Living",
    description:
      "Tucked among rice terraces, this second Aluna property trades beach breeze for jungle quiet — the same unhurried rhythm, a different backdrop.",
    cover_image:
      "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=1600&auto=format&fit=crop",
    amenities: [
      "Free Wi-Fi",
      "Rice Field View",
      "Daily Housekeeping",
      "Yoga Deck",
      "Breakfast Included",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop",
    ],
  },
];

export const mockRoomTypes: RoomType[] = [
  {
    id: "mock-room-deluxe",
    property_id: "mock-the-aluna-bali",
    name: "Deluxe Room",
    description:
      "Soft linens, warm teak wood, and a private courtyard view.",
    price: 750000,
    capacity: 2,
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "mock-room-family",
    property_id: "mock-the-aluna-bali",
    name: "Family Suite",
    description: "Extra space with a kitchenette, ideal for longer stays.",
    price: 1200000,
    capacity: 4,
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "mock-room-jungle",
    property_id: "mock-the-aluna-ubud",
    name: "Jungle View Room",
    description: "Wake up to rice terraces and morning mist.",
    price: 900000,
    capacity: 2,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1200&auto=format&fit=crop",
    ],
  },
];
