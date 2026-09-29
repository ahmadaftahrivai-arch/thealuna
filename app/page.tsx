import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PropertyLanding } from "@/components/property-landing";
import { getPrimaryProperty, getRoomTypesByPropertyId } from "@/lib/data";

export default async function HomePage() {
  const property = await getPrimaryProperty();

  if (!property) {
    return (
      <>
        <Navbar />
        <main className="flex-1">
          <section className="mx-auto max-w-2xl px-6 py-24 text-center">
            <h1 className="font-serif text-4xl text-stone-900">
              No properties yet
            </h1>
            <p className="mt-4 text-stone-600">
              Add a property in Supabase (or lib/mock-data.ts) to see it
              here.
            </p>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const rooms = await getRoomTypesByPropertyId(property.id);

  return (
    <>
      <Navbar
        propertyName={property.name}
        propertySlug={property.slug}
        isHome
      />
      <main className="flex-1">
        <PropertyLanding property={property} rooms={rooms} />
      </main>
      <Footer />
    </>
  );
}
