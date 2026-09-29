import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getProperties } from "@/lib/data";

export default async function HomePage() {
  const properties = await getProperties();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Find your next slow stay
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-neutral-600">
            Boutique guest houses designed for unhurried travel. Pick a
            property below to see rooms and send a booking inquiry.
          </p>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-20 sm:grid-cols-2">
          {properties.map((property) => (
            <Link
              key={property.id}
              href={`/properties/${property.slug}`}
              className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={property.cover_image}
                  alt={property.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                  {property.location}
                </p>
                <h2 className="mt-1 text-xl font-semibold">
                  {property.name}
                </h2>
                <p className="mt-2 text-sm text-neutral-600">
                  {property.tagline}
                </p>
              </div>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
