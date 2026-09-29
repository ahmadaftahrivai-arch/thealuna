import { notFound } from "next/navigation";
import { getPropertyBySlug, getRoomTypesByPropertyId } from "@/lib/data";
import { RoomCard } from "@/components/room-card";

export default async function AccommodationsPage({
  params,
}: PageProps<"/properties/[slug]/accommodations">) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const rooms = await getRoomTypesByPropertyId(property.id);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Accommodations</h1>
      <p className="mt-2 text-neutral-600">
        Room types available at {property.name}.
      </p>

      {rooms.length === 0 ? (
        <p className="mt-10 text-neutral-500">
          No rooms have been added for this property yet.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </section>
  );
}
