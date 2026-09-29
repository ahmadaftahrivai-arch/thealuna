import Image from "next/image";
import Link from "next/link";
import type { Property, RoomType } from "@/lib/types";
import { RoomCard } from "@/components/room-card";
import { AmenitiesList } from "@/components/amenities-list";

export function PropertyLanding({
  property,
  rooms,
}: {
  property: Property;
  rooms: RoomType[];
}) {
  const basePath = `/properties/${property.slug}`;

  return (
    <>
      <section className="relative flex h-[92vh] min-h-[560px] w-full items-end">
        <Image
          src={property.cover_image}
          alt={property.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/0" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 text-white sm:pb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-white/80">
            {property.location}
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] sm:text-7xl">
            {property.name}
          </h1>
          <p className="mt-4 max-w-md text-sm uppercase tracking-[0.2em] text-white/70">
            {property.tagline}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-10 sm:grid-cols-[1fr_2fr] sm:gap-16">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
            {property.name}
          </p>
          <div>
            <h2 className="font-serif text-3xl leading-tight text-stone-900 sm:text-4xl">
              {property.tagline}
            </h2>
            <p className="mt-6 max-w-2xl text-stone-600">
              {property.description}
            </p>
          </div>
        </div>
      </section>

      {rooms.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="flex items-end justify-between">
            <h2 className="font-serif text-3xl text-stone-900">Rooms</h2>
            <Link
              href={`${basePath}/accommodations`}
              className="text-sm font-medium text-stone-600 underline underline-offset-4 hover:text-stone-900"
            >
              View all
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.slice(0, 3).map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>
      )}

      <section className="bg-stone-100 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-serif text-3xl text-stone-900">Amenities</h2>
          <div className="mt-8">
            <AmenitiesList amenities={property.amenities} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-28 text-center">
        <h2 className="font-serif text-3xl text-stone-900 sm:text-4xl">
          Ready to book your stay?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-stone-600">
          Send us your dates and we&apos;ll get back to you to confirm
          availability.
        </p>
        <Link
          href={`${basePath}/contact`}
          className="mt-8 inline-block rounded-full bg-stone-900 px-8 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Send a Booking Inquiry
        </Link>
      </section>
    </>
  );
}
