export type PropertyHighlight = {
  image: string;
  title: string;
  description: string;
};

export type Property = {
  id: string;
  slug: string;
  name: string;
  location: string;
  tagline: string;
  description: string;
  cover_image: string;
  amenities: string[];
  gallery: string[];
  highlights: PropertyHighlight[];
};

export type RoomType = {
  id: string;
  property_id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  images: string[];
};
