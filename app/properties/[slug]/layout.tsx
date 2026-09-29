import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getPropertyBySlug } from "@/lib/data";

export default async function PropertyLayout({
  children,
  params,
}: LayoutProps<"/properties/[slug]">) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) notFound();

  return (
    <>
      <Navbar propertyName={property.name} propertySlug={property.slug} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
