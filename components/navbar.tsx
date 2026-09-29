import Link from "next/link";

type NavbarProps = {
  propertyName?: string;
  propertySlug?: string;
};

export function Navbar({ propertyName, propertySlug }: NavbarProps) {
  const links = propertySlug
    ? [
        { href: `/properties/${propertySlug}`, label: "About" },
        {
          href: `/properties/${propertySlug}/accommodations`,
          label: "Accommodations",
        },
        { href: `/properties/${propertySlug}/gallery`, label: "Gallery" },
        { href: `/properties/${propertySlug}/contact`, label: "Contact Us" },
      ]
    : [{ href: "/", label: "Properties" }];

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-wide">
          {propertyName ?? "The Aluna"}
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium uppercase tracking-wide text-neutral-700 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-neutral-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={propertySlug ? `/properties/${propertySlug}/contact` : "/"}
          className="rounded-full bg-neutral-950 px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Book Now
        </Link>
      </div>
    </header>
  );
}
