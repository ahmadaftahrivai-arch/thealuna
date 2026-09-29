import Image from "next/image";

export function GalleryGrid({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {images.map((src, index) => (
        <div
          key={src}
          className="relative aspect-square overflow-hidden rounded-xl"
        >
          <Image
            src={src}
            alt={`Gallery photo ${index + 1}`}
            fill
            className="object-cover"
            sizes="(min-width: 640px) 33vw, 50vw"
          />
        </div>
      ))}
    </div>
  );
}
