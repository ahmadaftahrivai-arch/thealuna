import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { GalleryGrid } from "@/components/gallery-grid";
import { FeatureCarousel, type CarouselSlide } from "@/components/feature-carousel";
import { getProperties } from "@/lib/data";
import { brand } from "@/lib/brand";

export default async function HomePage() {
  const properties = await getProperties();

  const slides: CarouselSlide[] = properties.map((property) => ({
    image: property.cover_image,
    eyebrow: property.location,
    title: property.name,
    description: property.tagline,
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
            <h1 className="animate-fade-in-up mt-4 font-serif text-5xl leading-[1.05] sm:text-7xl">
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

        <Reveal>
          <section id="locations" className="scroll-mt-20 bg-stone-100 py-24">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="font-serif text-3xl text-stone-900">
                Our Locations
              </h2>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {properties.map((property, i) => (
                  <Reveal key={property.id} delay={i * 100}>
                    <Link
                      href={`/properties/${property.slug}`}
                      className="group block overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <Image
                          src={property.cover_image}
                          alt={property.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        />
                      </div>
                      <div className="p-6">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
                          {property.location}
                        </p>
                        <h3 className="mt-2 font-serif text-xl text-stone-900">
                          {property.name}
                        </h3>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="gallery" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
            <h2 className="font-serif text-3xl text-stone-900">Gallery</h2>
            <div className="mt-8">
              <GalleryGrid images={galleryImages} />
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="contact" className="mx-auto max-w-2xl scroll-mt-20 px-6 py-28 text-center">
            <h2 className="font-serif text-3xl text-stone-900 sm:text-4xl">
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
