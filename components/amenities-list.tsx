export function AmenitiesList({ amenities }: { amenities: string[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {amenities.map((amenity) => (
        <li
          key={amenity}
          className="flex items-center gap-2 rounded-xl border border-black/5 bg-white px-4 py-3 text-sm text-neutral-700"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" />
          {amenity}
        </li>
      ))}
    </ul>
  );
}
