"use client";

import { useState } from "react";
import Image from "next/image";

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

  function go(delta: number) {
    setIndex((i) => (i + delta + slides.length) % slides.length);
  }

  return (
    <div className="grid gap-10 sm:grid-cols-2 sm:items-center sm:gap-16">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone-200">
        <Image
          key={slide.image}
          src={slide.image}
          alt={slide.title}
          fill
          className="object-cover transition-opacity duration-500"
          sizes="(min-width: 640px) 50vw, 100vw"
        />
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
          {slide.eyebrow}
        </p>
        <h2 className="mt-3 font-serif text-3xl leading-tight text-stone-900 sm:text-4xl">
          {slide.title}
        </h2>
        <p className="mt-4 max-w-md text-stone-600">{slide.description}</p>

        {slides.length > 1 && (
          <div className="mt-8 flex items-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
            >
              →
            </button>
            <span className="ml-2 text-xs text-stone-400">
              {index + 1} / {slides.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
