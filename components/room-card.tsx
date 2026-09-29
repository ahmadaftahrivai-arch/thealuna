import Image from "next/image";
import type { RoomType } from "@/lib/types";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function RoomCard({ room }: { room: RoomType }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="p-6">
        <h3 className="font-serif text-lg text-stone-900">{room.name}</h3>
        <p className="mt-2 text-sm text-stone-600">{room.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-stone-500">
            Up to {room.capacity} guests
          </span>
          <span className="font-medium text-stone-900">
            {currencyFormatter.format(room.price)}
            <span className="text-sm font-normal text-stone-500">
              /night
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
