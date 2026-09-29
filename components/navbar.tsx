import Link from "next/link";

type NavbarProps =
  | { variant?: "brand" }
  | { variant: "property"; propertyName: string; propertySlug: string };

export function Navbar(props: NavbarProps) {
  const isProperty = props.variant === "property";
  const base = isProperty ? `/properties/${props.propertySlug}` : "";

  const links = [
    { href: `${base}#about`, label: "About" },
    {
      href: `${base}#${isProperty ? "rooms" : "locations"}`,
      label: "Accommodations",
    },
    { href: `${base}#gallery`, label: "Gallery" },
    { href: `${base}#contact`, label: "Contact Us" },
  ];

  const brandLabel = isProperty ? props.propertyName : "The Aluna";
  const homeHref = isProperty ? base : "/";

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href={homeHref}
          className="font-semibold text-xl tracking-tight text-[#3D2709]"
        >
          {brandLabel}
        </Link>

        <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.15em] text-stone-600 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-[#3D2709]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={`${base}#contact`}
          className="rounded-full bg-[#3D2709] px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Book Now
        </Link>
      </div>
    </header>
  );
}
