import type { Property, RoomType } from "@/lib/types";
import { RoomCard } from "@/components/room-card";
import { AmenitiesList } from "@/components/amenities-list";
import { ScrollGallery } from "@/components/scroll-gallery";
import { Reveal } from "@/components/reveal";
import { Hero } from "@/components/hero";
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
      <Hero
        eyebrow={property.location}
        title={property.name}
        tagline={property.tagline}
      />

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
    </>
  );
}
