import { notFound } from "next/navigation";
import { getPropertyBySlug, getRoomTypesByPropertyId } from "@/lib/data";
import { InquiryForm } from "@/components/inquiry-form";

export default async function ContactPage({
  params,
}: PageProps<"/properties/[slug]/contact">) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const rooms = await getRoomTypesByPropertyId(property.id);

  return (
    <section className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="font-serif text-4xl text-stone-900">Book Your Stay</h1>
      <p className="mt-2 text-stone-600">
        Send us your details and preferred dates for {property.name}.
        We&apos;ll confirm availability by email or phone.
      </p>

      <div className="mt-10">
        <InquiryForm propertyId={property.id} rooms={rooms} />
      </div>
    </section>
  );
}
