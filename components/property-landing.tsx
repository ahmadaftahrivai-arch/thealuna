import Image from "next/image";
import type { Property, RoomType } from "@/lib/types";
import { RoomCard } from "@/components/room-card";
import { AmenitiesList } from "@/components/amenities-list";
import { ScrollGallery } from "@/components/scroll-gallery";
import { InquiryForm } from "@/components/inquiry-form";
import { Reveal } from "@/components/reveal";
import { FeatureCarousel, type CarouselSlide } from "@/components/feature-carousel";

export function PropertyLanding({
  property,
  rooms,
}: {
  property: Property;
  rooms: RoomType[];
}) {
  const aboutSlides: CarouselSlide[] = property.highlights.map((h) => ({
    image: h.image,
    eyebrow: property.name,
    title: h.title,
    description: h.description,
  }));

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
          <p className="animate-fade-in text-xs uppercase tracking-[0.3em] text-white/80">
            {property.location}
          </p>
          <h1 className="animate-fade-in-up mt-4 font-bold text-5xl leading-[1.05] sm:text-7xl">
            {property.name}
          </h1>
          <p className="animate-fade-in-up mt-4 max-w-md text-sm uppercase tracking-[0.2em] text-white/70">
            {property.tagline}
          </p>
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 animate-bounce text-white/70">
          ↓
        </div>
      </section>

      {aboutSlides.length > 0 && (
        <Reveal>
          <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
            <FeatureCarousel slides={aboutSlides} />
          </section>
        </Reveal>
      )}

      {rooms.length > 0 && (
        <Reveal>
          <section id="rooms" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-24">
            <h2 className="font-bold text-3xl text-stone-900">Rooms</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rooms.map((room, i) => (
                <Reveal key={room.id} delay={i * 100}>
                  <RoomCard room={room} />
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      <Reveal>
        <section className="bg-stone-100 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-bold text-3xl text-stone-900">Amenities</h2>
            <div className="mt-8">
              <AmenitiesList amenities={property.amenities} />
            </div>
          </div>
        </section>
      </Reveal>

      <section id="gallery" className="scroll-mt-20">
        <ScrollGallery images={[property.cover_image, ...property.gallery]} />
      </section>

      <Reveal>
        <section
          id="contact"
          className="mx-auto max-w-2xl scroll-mt-20 px-6 py-28"
        >
          <div className="text-center">
            <h2 className="font-bold text-3xl text-stone-900 sm:text-4xl">
              Ready to book your stay?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-stone-600">
              Send us your dates and we&apos;ll get back to you to confirm
              availability.
            </p>
          </div>
          <div className="mt-10">
            <InquiryForm propertyId={property.id} rooms={rooms} />
          </div>
        </section>
      </Reveal>
    </>
  );
}
