import Image from "next/image";
import { Reveal } from "@/components/reveal";

export type DiscoverItem = {
  label: string;
  image: string;
};

export function buildDiscoverItems(
  labels: string[],
  images: string[]
): DiscoverItem[] {
  if (images.length === 0) return [];
  return labels.map((label, i) => ({
    label,
    image: images[i % images.length],
  }));
}

export function DiscoverSection({
  heading,
  bannerImage,
  bannerLabel,
  items,
}: {
  heading: string;
  bannerImage: string;
  bannerLabel: string;
  items: DiscoverItem[];
}) {
  return (
    <section className="bg-white px-4 py-16 lg:px-7 lg:py-24">
      <Reveal>
        <div className="relative min-h-[40vh] overflow-hidden rounded-2xl lg:min-h-[50vh]">
          <Image
            src={bannerImage}
            alt={bannerLabel}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute left-0 top-0 bg-white py-2 pb-2 pl-2 pr-3 text-center text-lg font-semibold text-[#221604] lg:py-5 lg:pb-5 lg:pl-4 lg:pr-5 lg:text-start lg:text-5xl">
            {bannerLabel}
          </div>
        </div>
      </Reveal>

      {items.length > 0 && (
        <div className="mt-10 px-2 lg:px-4">
          <Reveal>
            <h2 className="mb-8 text-lg font-semibold text-[#221604] lg:mb-12 lg:text-4xl">
              {heading}
            </h2>
          </Reveal>

          <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:gap-4">
            {items.map((item, i) => (
              <Reveal
                key={item.label}
                delay={i * 100}
                className="w-full lg:w-auto lg:grow lg:hover:grow-[2.5]"
              >
                <div className="relative h-16 w-full cursor-pointer overflow-hidden rounded-xl bg-stone-200 lg:h-72 lg:rounded-2xl">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 20vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3D2709]/80 via-[#3D2709]/30 to-transparent lg:bg-gradient-to-t" />
                  <div className="absolute inset-0 flex items-center p-4 lg:items-end lg:p-6">
                    <p className="whitespace-nowrap text-sm font-semibold text-white lg:text-xl">
                      {item.label}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
