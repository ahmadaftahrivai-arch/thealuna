import type { Property, RoomType } from "@/lib/types";
import { RoomCard } from "@/components/room-card";
import { AmenitiesList } from "@/components/amenities-list";
import { ScrollGallery } from "@/components/scroll-gallery";
import { InquiryForm } from "@/components/inquiry-form";
import { Reveal } from "@/components/reveal";
import { HeroVideo } from "@/components/hero-video";
import { FeatureCarousel, type CarouselSlide } from "@/components/feature-carousel";
import { OffersCarousel } from "@/components/offers-carousel";
import { DiscoverSection, buildDiscoverItems } from "@/components/discover-section";

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
      <section className="relative flex h-dvh min-h-[560px] w-full items-end">
        <HeroVideo
          src="/videos/hero.mp4"
          poster="/videos/hero-poster.jpg"
          alt={property.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D2709]/80 via-[#3D2709]/20 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 text-white sm:pb-20">
          <p className="animate-fade-in text-xs uppercase tracking-[0.3em] text-white/80">
            {property.location}
          </p>
          <h1 className="animate-fade-in-up mt-4 font-semibold text-5xl leading-[1.05] sm:text-7xl">
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
            <h2 className="font-semibold text-3xl text-[#3D2709]">Rooms</h2>
            <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(240px,340px))] justify-start gap-6">
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
            <h2 className="font-semibold text-3xl text-[#3D2709]">Amenities</h2>
            <div className="mt-8">
              <AmenitiesList amenities={property.amenities} />
            </div>
          </div>
        </section>
      </Reveal>

      <section id="gallery" className="scroll-mt-20">
        <ScrollGallery images={[property.cover_image, ...property.gallery]} />
      </section>

      <section className="bg-gradient-to-b from-[#3D2709] to-[#211503] py-16">
        <OffersCarousel />
      </section>

      <DiscoverSection
        heading={`Discover ${property.name}`}
        bannerImage={property.cover_image}
        bannerLabel="Crafting Home for Everyone"
        items={buildDiscoverItems(property.amenities, [
          property.cover_image,
          ...property.gallery,
        ])}
      />

      <Reveal>
        <section
          id="contact"
          className="mx-auto max-w-2xl scroll-mt-20 px-6 py-28"
        >
          <div className="text-center">
            <h2 className="font-semibold text-3xl text-[#3D2709] sm:text-4xl">
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
