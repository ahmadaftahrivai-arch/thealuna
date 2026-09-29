"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type NavbarProps =
  | { variant?: "brand" }
  | { variant: "property"; propertyName: string; propertySlug: string };

export function Navbar(props: NavbarProps) {
  const isProperty = props.variant === "property";
  const base = isProperty ? `/properties/${props.propertySlug}` : "";

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? "border-b border-stone-200 bg-stone-50/90 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href={homeHref}
          className={`font-semibold text-xl tracking-tight transition-colors duration-300 ${
            scrolled ? "text-[#3D2709]" : "text-white"
          }`}
        >
          {brandLabel}
        </Link>

        <nav
          className={`hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-300 md:flex ${
            scrolled ? "text-stone-600" : "text-white/80"
          }`}
        >
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`transition-colors ${
                scrolled
                  ? "hover:text-[#3D2709]"
                  : "hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={`${base}#contact`}
          className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300 ${
            scrolled
              ? "bg-[#3D2709] text-white hover:opacity-90"
              : "border border-white/70 text-white hover:bg-white/10"
          }`}
        >
          Book Now
        </Link>
      </div>
    </motion.header>
  );
}
