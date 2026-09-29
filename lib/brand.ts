// Brand-level copy for the main site (app/page.tsx). This isn't tied to any
// single property, so it lives in code rather than Supabase — edit it
// directly, no admin dashboard needed for this.

export const brand = {
  name: "The Aluna",
  tagline: "Boutique Stays, Thoughtfully Placed",
  description:
    "The Aluna is a small collection of boutique guest houses across Bali. Each location is designed around its own neighborhood's rhythm, but built on the same promise: sunlit rooms, quiet corners, and a stay that feels less like a hotel and more like somewhere you already belong.",
  heroImage:
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1920&auto=format&fit=crop",
  // Brand-wide story slides for the "/" #about carousel — not tied to any
  // one property (that's what #locations is for).
  highlights: [
    {
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
      title: "A Collection of Slow Stays",
      description:
        "The Aluna is a small collection of boutique guest houses across Bali. Each location is designed around its own neighborhood's rhythm, but built on the same promise: sunlit rooms, quiet corners, and a stay that feels less like a hotel and more like somewhere you already belong.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1200&auto=format&fit=crop",
      title: "Designed for Slow Living",
      description:
        "Soft linens, warm teak wood, and locally crafted décor shape spaces made for unwinding at your own pace, wherever you land — beachside or up in the rice terraces.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop",
      title: "Warm, Attentive Service",
      description:
        "Every Aluna is run by hosts who treat you like family, not a room number — a warm welcome, honest recommendations, and small gestures that make a stay feel effortless.",
    },
  ],
};
