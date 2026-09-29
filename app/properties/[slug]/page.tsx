import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPropertyBySlug, getRoomTypesByPropertyId } from "@/lib/data";
import { RoomCard } from "@/components/room-card";
import { AmenitiesList } from "@/components/amenities-list";

export default async function PropertyPage({
  params,
}: PageProps<"/properties/[slug]">) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const rooms = await getRoomTypesByPropertyId(property.id);

  return (
    <>
      <section className="relative h-[60vh] min-h-[420px] w-full">
        <Image
          src={property.cover_image}
          alt={property.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-end bg-black/20">
          <div className="mx-auto w-full max-w-6xl px-6 pb-12 text-white">
            <p className="text-sm uppercase tracking-widest">
              {property.location}
            </p>
            <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">
              {property.name}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
          {property.name}
        </p>
        <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
          {property.tagline}
        </h2>
        <p className="mt-6 max-w-3xl text-neutral-600">
          {property.description}
        </p>
      </section>

      {rooms.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Rooms</h2>
            <Link
              href={`/properties/${property.slug}/accommodations`}
              className="text-sm font-medium underline underline-offset-4"
            >
              View all
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.slice(0, 3).map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>
      )}

      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold">Amenities</h2>
          <div className="mt-6">
            <AmenitiesList amenities={property.amenities} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold">Ready to book your stay?</h2>
        <p className="mx-auto mt-2 max-w-xl text-neutral-600">
          Send us your dates and we&apos;ll get back to you to confirm
          availability.
        </p>
        <Link
          href={`/properties/${property.slug}/contact`}
          className="mt-6 inline-block rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Send a Booking Inquiry
        </Link>
      </section>
    </>
  );
}
