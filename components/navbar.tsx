import Link from "next/link";

type NavbarProps = {
  propertyName?: string;
  propertySlug?: string;
  isHome?: boolean;
};

export function Navbar({ propertyName, propertySlug, isHome }: NavbarProps) {
  const links = propertySlug
    ? [
        { href: isHome ? "/" : `/properties/${propertySlug}`, label: "About" },
        {
          href: `/properties/${propertySlug}/accommodations`,
          label: "Accommodations",
        },
        { href: `/properties/${propertySlug}/gallery`, label: "Gallery" },
        { href: `/properties/${propertySlug}/contact`, label: "Contact Us" },
      ]
    : [{ href: "/", label: "Properties" }];

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-serif text-xl tracking-wide text-stone-900"
        >
          {propertyName ?? "The Aluna"}
        </Link>

        <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.15em] text-stone-600 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-stone-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={propertySlug ? `/properties/${propertySlug}/contact` : "/"}
          className="rounded-full bg-stone-900 px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Book Now
        </Link>
      </div>
    </header>
  );
}
