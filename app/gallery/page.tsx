import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { GalleryGrid } from "@/components/gallery-grid";
import { getProperties } from "@/lib/data";

export default async function GalleryPage() {
  const properties = await getProperties();
  const images = properties.flatMap((property) => [
    property.cover_image,
    ...property.gallery,
  ]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Reveal>
          <section className="mx-auto max-w-6xl px-6 py-20">
            <h1 className="font-serif text-4xl text-stone-900 sm:text-5xl">
              Gallery
            </h1>
            <p className="mt-2 text-stone-600">
              A look across every Aluna location.
            </p>
          </section>
        </Reveal>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <GalleryGrid images={images} />
        </section>
      </main>
      <Footer />
    </>
  );
}
