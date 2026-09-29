"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export type CarouselSlide = {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
};

export function FeatureCarousel({ slides }: { slides: CarouselSlide[] }) {
  const [index, setIndex] = useState(0);

  if (slides.length === 0) return null;
  const slide = slides[index];

  function go(direction: "prev" | "next") {
    setIndex((i) =>
      direction === "next"
        ? (i + 1) % slides.length
        : (i - 1 + slides.length) % slides.length
    );
  }

  return (
    <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
      <motion.div
        key={`image-${index}`}
        initial={{ opacity: 0, scale: 0.95, x: -30 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative h-72 overflow-hidden rounded-2xl bg-stone-200 md:h-[420px]"
      >
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </motion.div>

      <div className="flex flex-col">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
          {slide.eyebrow}
        </p>

        <motion.h2
          key={`title-${index}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="mt-3 font-bold text-3xl leading-tight text-stone-900 sm:text-4xl"
        >
          {slide.title}
        </motion.h2>
        <motion.p
          key={`desc-${index}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: "easeOut" }}
          className="mt-4 max-w-md text-stone-600"
        >
          {slide.description}
        </motion.p>

        {slides.length > 1 && (
          <div className="mt-8 flex items-center gap-6">
            <motion.button
              type="button"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              aria-label="Previous"
              onClick={() => go("prev")}
              className="rounded-full p-2 text-xl text-stone-900 transition-colors hover:bg-stone-100"
            >
              ←
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              aria-label="Next"
              onClick={() => go("next")}
              className="rounded-full p-2 text-xl text-stone-900 transition-colors hover:bg-stone-100"
            >
              →
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
