import { getSupabaseServerClient } from "./supabase/server";
import { mockProperties, mockRoomTypes } from "./mock-data";
import type { Property, RoomType } from "./types";

export async function getProperties(): Promise<Property[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return mockProperties;

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw new Error(`Failed to load properties: ${error.message}`);
  return data ?? [];
}

export async function getPrimaryProperty(): Promise<Property | null> {
  const properties = await getProperties();
  return properties[0] ?? null;
}

export async function getPropertyBySlug(
  slug: string
): Promise<Property | null> {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return mockProperties.find((p) => p.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(`Failed to load property: ${error.message}`);
  return data;
}

export async function getRoomTypesByPropertyId(
  propertyId: string
): Promise<RoomType[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return mockRoomTypes.filter((r) => r.property_id === propertyId);
  }

  const { data, error } = await supabase
    .from("room_types")
    .select("*")
    .eq("property_id", propertyId)
    .order("price", { ascending: true });

  if (error) throw new Error(`Failed to load room types: ${error.message}`);
  return data ?? [];
}
