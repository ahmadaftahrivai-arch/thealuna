import type { Property, RoomType } from "./types";

// Used when NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not
// set, so the app is browsable before a Supabase project exists. Mirrors the
// seed data in supabase/schema.sql.

export const mockProperties: Property[] = [
  {
    id: "mock-the-aluna-bali",
    slug: "the-aluna-canggu",
    name: "The Aluna Canggu",
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
    highlights: [
      {
        image:
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200&auto=format&fit=crop",
        title: "A Cozy Guest House",
        description:
          "Where island calm meets everyday comfort. The Aluna is a boutique guest house built for those who travel slowly — sunlit rooms, a quiet courtyard, and spaces that feel like they've always been yours.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop",
        title: "Designed for Slow Living",
        description:
          "Soft linens, warm teak wood, and locally crafted décor shape spaces made for unwinding at your own pace. Private corners invite quiet reflection, while open courtyards become the gentle backdrop between your Bali adventures.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1200&auto=format&fit=crop",
        title: "Warm, Attentive Service",
        description:
          "From the moment you arrive, our hosts treat you like family — not just a room number. Expect a warm welcome, freshly brewed coffee at dawn, and honest recommendations for the Bali only locals know.",
      },
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
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1600&auto=format&fit=crop",
    amenities: [
      "Free Wi-Fi",
      "Rice Field View",
      "Daily Housekeeping",
      "Yoga Deck",
      "Breakfast Included",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1200&auto=format&fit=crop&crop=entropy",
    ],
    highlights: [
      {
        image:
          "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1200&auto=format&fit=crop",
        title: "Designed for Slow Living",
        description:
          "Tucked among rice terraces, this second Aluna property trades beach breeze for jungle quiet — the same unhurried rhythm, a different backdrop.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1200&auto=format&fit=crop&crop=focalpoint&fp-x=0.7",
        title: "Warm, Attentive Service",
        description:
          "Our hosts know the trails, the best warung, and exactly when the mist clears over the terraces. Expect honest recommendations and a homemade breakfast every morning.",
      },
    ],
  },
  {
    id: "mock-the-aluna-uluwatu",
    slug: "the-aluna-uluwatu",
    name: "The Aluna Uluwatu",
    location: "Uluwatu, Bali",
    tagline: "A Cliffside Retreat",
    description:
      "Perched above the limestone cliffs of Uluwatu, this Aluna trades rice terraces and beach breeze for open ocean and long horizons — sunrise coffee on the terrace, sunset from the infinity pool.",
    cover_image:
      "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=1600&auto=format&fit=crop",
    amenities: [
      "Free Wi-Fi",
      "Ocean View",
      "Infinity Pool",
      "Daily Housekeeping",
      "Breakfast Included",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=1200&auto=format&fit=crop&crop=focalpoint&fp-x=0.3",
      "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=1200&auto=format&fit=crop&crop=focalpoint&fp-x=0.7",
    ],
    highlights: [
      {
        image:
          "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=1200&auto=format&fit=crop",
        title: "A Cliffside Retreat",
        description:
          "Perched above the limestone cliffs of Uluwatu, this Aluna trades rice terraces and beach breeze for open ocean and long horizons — sunrise coffee on the terrace, sunset from the infinity pool.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=1200&auto=format&fit=crop&crop=focalpoint&fp-x=0.5",
        title: "Where the Land Meets the Sea",
        description:
          "Every room looks out over the same endless water. Days move around the tide, the sunset, and the sound of waves against the cliff face far below.",
      },
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
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1200&auto=format&fit=crop&crop=focalpoint&fp-x=0.3",
    ],
  },
  {
    id: "mock-room-cliff",
    property_id: "mock-the-aluna-uluwatu",
    name: "Cliff View Suite",
    description: "Floor-to-ceiling ocean views and a private terrace.",
    price: 1450000,
    capacity: 2,
    images: [
      "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=1200&auto=format&fit=crop&crop=focalpoint&fp-x=0.6",
    ],
  },
];
