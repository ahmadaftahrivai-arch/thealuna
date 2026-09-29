"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Property } from "@/lib/types";
import { bookingMessage, buildWhatsAppHref } from "@/lib/whatsapp";

function BranchCard({
  property,
  index,
  isFirst,
  isLast,
}: {
  property: Property;
  index: number;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div
      className={`group w-[85vw] shrink-0 snap-center rounded-2xl sm:w-[420px] md:w-[500px] ${
        isFirst ? "ml-4 lg:ml-7" : ""
      } ${isLast ? "mr-4 lg:mr-7" : ""}`}
    >
      <motion.div
        className="relative h-40 overflow-hidden rounded-xl sm:h-52"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.2, ease: "easeOut" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={property.cover_image}
          alt={property.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>

      <div className="flex flex-col px-4">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.2, ease: "easeOut" }}
          className="mt-5 text-2xl font-semibold text-white"
        >
          {property.name}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.3, ease: "easeOut" }}
          className="mt-2 text-sm text-white/70"
        >
          {property.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.4, ease: "easeOut" }}
          className="mt-5 flex items-center gap-6"
        >
          <a
            href={buildWhatsAppHref(bookingMessage(property.name))}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer rounded-full px-5 py-2 text-sm text-white ring-1 ring-white/60 transition hover:bg-white/10"
          >
            Book Now
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export function BranchesCarousel({ properties }: { properties: Property[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "prev" | "next") {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth =
      (el.querySelector<HTMLElement>(".group")?.clientWidth ?? 0) + 24;
    el.scrollBy({
      left: direction === "next" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center justify-between px-4 sm:px-7"
      >
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          Our Locations
        </h2>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scroll("prev")}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/50 transition hover:bg-white/10"
          >
            <ChevronLeft className="h-4 w-4 text-white" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scroll("next")}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/50 transition hover:bg-white/10"
          >
            <ChevronRight className="h-4 w-4 text-white" />
          </button>
        </div>
      </motion.div>

      <div
        ref={scrollRef}
        style={{ scrollPaddingLeft: "1rem", scrollPaddingRight: "1rem" }}
        className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4"
      >
        {properties.map((property, i) => (
          <BranchCard
            key={property.id}
            property={property}
            index={i}
            isFirst={i === 0}
            isLast={i === properties.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
