import Link from "next/link";

type NavbarProps =
  | { variant?: "brand" }
  | { variant: "property"; propertyName: string; propertySlug: string };

export function Navbar(props: NavbarProps) {
  const isProperty = props.variant === "property";

  const links = isProperty
    ? [
        { href: `/properties/${props.propertySlug}`, label: "About" },
        {
          href: `/properties/${props.propertySlug}/accommodations`,
          label: "Accommodations",
        },
        { href: `/properties/${props.propertySlug}/gallery`, label: "Gallery" },
        {
          href: `/properties/${props.propertySlug}/contact`,
          label: "Contact Us",
        },
      ]
    : [
        { href: "/", label: "About" },
        { href: "/accommodations", label: "Accommodations" },
        { href: "/gallery", label: "Gallery" },
        { href: "/accommodations", label: "Contact Us" },
      ];

  const brandLabel = isProperty ? props.propertyName : "The Aluna";
  const bookNowHref = isProperty
    ? `/properties/${props.propertySlug}/contact`
    : "/accommodations";

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-serif text-xl tracking-wide text-stone-900"
        >
          {brandLabel}
        </Link>

        <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.15em] text-stone-600 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-stone-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={bookNowHref}
          className="rounded-full bg-stone-900 px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Book Now
        </Link>
      </div>
    </header>
  );
}
