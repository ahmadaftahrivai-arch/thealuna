"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Logo } from "@/components/logo";
import { buildWhatsAppHref } from "@/lib/whatsapp";

type NavbarProps =
  | { variant?: "brand" }
  | { variant: "property"; propertyName: string; propertySlug: string };

export function Navbar(props: NavbarProps) {
  const isProperty = props.variant === "property";
  const base = isProperty ? `/properties/${props.propertySlug}` : "";

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    function check() {
      setScrolled((prev) => {
        const next = window.scrollY > 10;
        return prev === next ? prev : next;
      });
    }
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(check);
    }
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const accommodationsAnchor = isProperty ? "rooms" : "locations";
  const links = [
    { name: "About", href: `${base}#about` },
    { name: "Events", href: `${base}#events` },
    { name: "Accommodations", href: `${base}#${accommodationsAnchor}` },
    { name: "Contact Us", href: `${base}#footer` },
    { name: "Gallery", href: `${base}#gallery` },
  ];

  const brandLabel = isProperty ? props.propertyName : "The Aluna";
  const homeHref = isProperty ? base : "/";
  const whatsappHref = buildWhatsAppHref(
    `Hi, I'd like to book a stay at ${brandLabel}.`
  );

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 flex w-full items-center justify-between px-6 transition-all duration-300 lg:px-12 ${
          scrolled
            ? "bg-white/95 py-3 shadow-sm backdrop-blur-md"
            : "bg-transparent py-4"
        }`}
      >
        <Link
          href={homeHref}
          className="shrink-0"
        >
          <Logo label={brandLabel} variant={scrolled ? "brown" : "white"} />
        </Link>

        <nav className="hidden items-center gap-8 md:flex lg:gap-12">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`group relative text-sm font-medium uppercase tracking-wide transition-colors duration-300 ${
                scrolled
                  ? "text-black hover:text-black/70"
                  : "text-white hover:text-white/70"
              }`}
            >
              {link.name}
              <span className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 transform bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <motion.a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`hidden rounded px-6 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors duration-300 md:block ${
            scrolled
              ? "bg-black text-white hover:bg-black/80"
              : "bg-white text-black hover:bg-white/90"
          }`}
        >
          Book Now
        </motion.a>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
          className="relative z-[60] flex h-5 w-5 flex-col justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-full transition-all duration-300 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            } ${scrolled || menuOpen ? "bg-black" : "bg-white"}`}
          />
          <span
            className={`h-0.5 w-full transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            } ${scrolled || menuOpen ? "bg-black" : "bg-white"}`}
          />
          <span
            className={`h-0.5 w-full transition-all duration-300 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            } ${scrolled || menuOpen ? "bg-black" : "bg-white"}`}
          />
        </button>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={closeMenu}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white shadow-2xl sm:w-80"
            >
              <div className="relative p-6">
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="absolute right-6 top-6 rounded-full p-2 transition-colors hover:bg-gray-100"
                >
                  <X className="h-6 w-6 text-black" />
                </button>

                <div className="mb-12 mt-8">
                  <Logo label={brandLabel} variant="brown" />
                </div>

                <nav className="flex flex-col gap-6">
                  {links.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={closeMenu}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-2xl font-semibold text-black transition-colors hover:text-black/70"
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </nav>

                <motion.a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12 block w-full rounded bg-black px-6 py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-black/80"
                >
                  Book Now
                </motion.a>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-12 border-t border-gray-200 pt-6"
                >
                  <p className="mb-2 text-sm text-gray-600">Contact Us</p>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="text-sm font-semibold text-black hover:text-black/70"
                  >
                    Chat with us on WhatsApp
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
