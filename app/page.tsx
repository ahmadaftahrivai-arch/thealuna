import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { ScrollGallery } from "@/components/scroll-gallery";
import { FeatureCarousel, type CarouselSlide } from "@/components/feature-carousel";
import { BranchesCarousel } from "@/components/branches-carousel";
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

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative flex h-[92vh] min-h-[560px] w-full items-end">
          <Image
            src={brand.heroImage}
            alt={brand.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/0" />
          <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 text-white sm:pb-20">
            <p className="animate-fade-in text-xs uppercase tracking-[0.3em] text-white/80">
              Boutique Guest Houses in Bali
            </p>
            <h1 className="animate-fade-in-up mt-4 font-bold text-5xl leading-[1.05] sm:text-7xl">
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

        <section id="locations" className="scroll-mt-20 bg-stone-950 py-24">
          <BranchesCarousel properties={properties} />
        </section>

        <section id="gallery" className="scroll-mt-20">
          <ScrollGallery images={galleryImages} />
        </section>

        <Reveal>
          <section id="contact" className="mx-auto max-w-2xl scroll-mt-20 px-6 py-28 text-center">
            <h2 className="font-bold text-3xl text-stone-900 sm:text-4xl">
              Ready to plan your stay?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-stone-600">
              Pick a location above and send a booking inquiry directly to
              that property.
            </p>
            <Link
              href="#locations"
              className="mt-8 inline-block rounded-full bg-stone-900 px-8 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
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
