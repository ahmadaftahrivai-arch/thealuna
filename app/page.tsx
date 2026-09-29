import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { HeroVideo } from "@/components/hero-video";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { ScrollGallery } from "@/components/scroll-gallery";
import { FeatureCarousel, type CarouselSlide } from "@/components/feature-carousel";
import { BranchesCarousel } from "@/components/branches-carousel";
import { OffersCarousel } from "@/components/offers-carousel";
import { DiscoverSection, buildDiscoverItems } from "@/components/discover-section";
import { getProperties } from "@/lib/data";
import { brand } from "@/lib/brand";

export default async function HomePage() {
  const properties = await getProperties();

  const slides: CarouselSlide[] = brand.highlights.map((h) => ({
    image: h.image,
    eyebrow: brand.name,
    title: h.title,
    description: h.description,
  }));

  const galleryImages = properties.flatMap((property) => [
    property.cover_image,
    ...property.gallery,
  ]);

  const discoverLabels = Array.from(
    new Set(properties.flatMap((property) => property.amenities))
  ).slice(0, 6);
  const discoverItems = buildDiscoverItems(discoverLabels, galleryImages);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative flex h-dvh min-h-[560px] w-full items-end">
          <HeroVideo
            src="/videos/hero.mp4"
            poster="/videos/hero-poster.jpg"
            alt={brand.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3D2709]/80 via-[#3D2709]/20 to-transparent" />
          <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 text-white sm:pb-20">
            <p className="animate-fade-in text-xs uppercase tracking-[0.3em] text-white/80">
              Boutique Guest Houses in Bali
            </p>
            <h1 className="animate-fade-in-up mt-4 font-semibold text-5xl leading-[1.05] sm:text-7xl">
              {brand.name}
            </h1>
            <p className="animate-fade-in-up mt-4 max-w-md text-sm uppercase tracking-[0.2em] text-white/70">
              {brand.tagline}
            </p>
          </div>

          <div className="absolute bottom-6 left-1/2 z-10 animate-bounce text-white/70">
            ↓
          </div>
        </section>

        {slides.length > 0 && (
          <Reveal>
            <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
              <FeatureCarousel slides={slides} />
            </section>
          </Reveal>
        )}

        <section id="locations" className="scroll-mt-20 bg-gradient-to-b from-[#3D2709] to-[#211503] py-24">
          <BranchesCarousel properties={properties} />
        </section>

        <section id="gallery" className="scroll-mt-20">
          <ScrollGallery images={galleryImages} />
        </section>

        <section className="bg-gradient-to-b from-[#3D2709] to-[#211503] py-16">
          <OffersCarousel />
        </section>

        {discoverItems.length > 0 && (
          <DiscoverSection
            heading={`Discover ${brand.name}`}
            bannerImage={brand.heroImage}
            bannerLabel="Crafting Home for Everyone"
            items={discoverItems}
          />
        )}

        <Reveal>
          <section id="contact" className="mx-auto max-w-2xl scroll-mt-20 px-6 py-28 text-center">
            <h2 className="font-semibold text-3xl text-[#3D2709] sm:text-4xl">
              Ready to plan your stay?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-stone-600">
              Pick a location above and reach out on WhatsApp to book your
              stay directly with that property.
            </p>
            <Link
              href="#locations"
              className="mt-8 inline-block rounded-full bg-[#3D2709] px-8 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Browse Locations
            </Link>
          </section>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
