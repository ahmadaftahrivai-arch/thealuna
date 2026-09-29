import { notFound } from "next/navigation";
import { getPropertyBySlug, getRoomTypesByPropertyId } from "@/lib/data";
import { PropertyLanding } from "@/components/property-landing";

export default async function PropertyPage({
  params,
}: PageProps<"/properties/[slug]">) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const rooms = await getRoomTypesByPropertyId(property.id);

  return <PropertyLanding property={property} rooms={rooms} />;
}
