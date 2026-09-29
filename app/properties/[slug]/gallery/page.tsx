import { notFound } from "next/navigation";
import { getPropertyBySlug } from "@/lib/data";
import { GalleryGrid } from "@/components/gallery-grid";

export default async function GalleryPage({
  params,
}: PageProps<"/properties/[slug]/gallery">) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Gallery</h1>
      <p className="mt-2 text-neutral-600">A closer look at {property.name}.</p>

      <div className="mt-10">
        <GalleryGrid images={[property.cover_image, ...property.gallery]} />
      </div>
    </section>
  );
}
