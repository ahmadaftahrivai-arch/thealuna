import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { getProperties } from "@/lib/data";

export default async function AccommodationsPage() {
  const properties = await getProperties();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Reveal>
          <section className="mx-auto max-w-6xl px-6 py-20 text-center">
            <h1 className="font-serif text-4xl text-stone-900 sm:text-5xl">
              Our Locations
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-stone-600">
              Every Aluna is a little different, shaped by its neighborhood.
              Pick one below to see rooms and send a booking inquiry.
            </p>
          </section>
        </Reveal>

        <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-24 sm:grid-cols-2">
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
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
                    {property.location}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl text-stone-900">
                    {property.name}
                  </h2>
                  <p className="mt-2 text-sm text-stone-600">
                    {property.tagline}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
