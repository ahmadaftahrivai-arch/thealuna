/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = ["Stay", "Explore", "Enjoy"];

type WordGroup = {
  word: string;
  left: [string, string, string];
  right: [string, string, string];
};

function buildGroups(images: string[]): WordGroup[] {
  if (images.length === 0) return [];
  const pick = (i: number) => images[i % images.length];
  return WORDS.map((word, wi) => {
    const base = wi * 3;
    return {
      word,
      left: [pick(base), pick(base + 1), pick(base + 2)],
      right: [pick(base + 3), pick(base + 4), pick(base + 5)],
    };
  });
}

const imgClass = "absolute inset-0 h-full w-full object-cover";
const wordClass = (active: boolean) =>
  `inline-block origin-left whitespace-nowrap text-4xl font-bold leading-none tracking-tight transition-all duration-500 ease-out sm:text-5xl ${
    active
      ? "text-stone-900 opacity-100 blur-none"
      : "text-stone-900/70 opacity-80 blur-sm"
  }`;

export function ScrollGallery({ images }: { images: string[] }) {
  const groups = buildGroups(images);
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (groups.length === 0) return;
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const height = el.offsetHeight;
      const scrolled = Math.max(0, window.scrollY - top);
      const scrollable = height - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(scrolled / scrollable, 1) : 0;
      const raw = progress * (groups.length - 1);
      const next = Math.min(Math.round(raw), groups.length - 1);
      setIndex((i) => (next === i ? i : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [groups.length]);

  if (groups.length === 0) return null;
  const active = groups[index];

  return (
    <div
      ref={containerRef}
      style={{ height: `${groups.length * 80}vh` }}
      className="relative"
    >
      <div className="sticky top-10 h-screen">
        {/* Mobile */}
        <div className="flex h-full gap-10 px-6 md:hidden">
          <div className="flex w-5 flex-col gap-6 self-center">
            {groups.map((g, i) => (
              <div
                key={g.word}
                className={`sticky h-full rotate-[270deg] ${
                  i === 1 ? "mt-14 mb-5" : "my-10"
                }`}
              >
                <h2 className={wordClass(i === index)}>{g.word}</h2>
              </div>
            ))}
          </div>

          <div className="flex w-full flex-col gap-5 overflow-x-clip">
            <AnimatePresence mode="wait">
              <motion.div
                key={`m-l0-${index}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative h-28 w-full overflow-hidden rounded-[24px] bg-stone-100 sm:h-36 md:h-44"
              >
                <img src={active.left[0]} alt="Gallery" loading="lazy" className={imgClass} />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={`m-l1-${index}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="relative h-28 w-full overflow-hidden rounded-[24px] bg-stone-100 sm:h-36 md:h-44"
              >
                <img src={active.left[1]} alt="Gallery" loading="lazy" className={imgClass} />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={`m-r0-${index}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="relative h-28 w-full overflow-hidden rounded-[24px] bg-stone-100 sm:h-36 md:h-44"
              >
                <img src={active.right[0]} alt="Gallery" loading="lazy" className={imgClass} />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={`m-l2-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                className="relative h-28 w-full overflow-hidden rounded-[24px] bg-stone-100 sm:h-36 md:h-44"
              >
                <img src={active.left[2]} alt="Gallery" loading="lazy" className={imgClass} />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={`m-r1-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                className="relative h-28 w-full overflow-hidden rounded-[24px] bg-stone-100 sm:h-36 md:h-44"
              >
                <img src={active.right[1]} alt="Gallery" loading="lazy" className={imgClass} />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={`m-r2-${index}`}
                initial={{ opacity: 0, rotate: -5, scale: 0.95 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 5, scale: 0.95 }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                className="relative h-28 w-full overflow-hidden rounded-[24px] bg-stone-100 sm:h-36 md:h-44"
              >
                <img src={active.right[2]} alt="Gallery" loading="lazy" className={imgClass} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop */}
        <div className="mx-auto mt-10 hidden h-full max-w-7xl flex-col items-start justify-center gap-9 overflow-x-clip px-4 py-6 sm:px-6 md:flex md:py-10 lg:px-8">
          <div className="flex w-full gap-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={`d-l0-${index}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative h-28 w-[42%] overflow-hidden rounded-[24px] bg-stone-100 sm:h-36 md:h-44 lg:h-40"
              >
                <img src={active.left[0]} alt="Gallery" loading="lazy" className={imgClass} />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={`d-l1-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="relative h-28 w-[35%] overflow-hidden rounded-[24px] bg-stone-100 sm:h-36 md:h-44 lg:h-48"
              >
                <img src={active.left[1]} alt="Gallery" loading="lazy" className={imgClass} />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={`d-r0-${index}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="relative h-28 w-[23%] overflow-hidden rounded-[24px] bg-stone-100 sm:h-36 md:h-44 lg:h-48"
              >
                <img src={active.right[0]} alt="Gallery" loading="lazy" className={imgClass} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex w-full gap-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={`d-l1b-${index}`}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="relative h-28 w-[40%] overflow-hidden rounded-[24px] bg-stone-100 sm:h-36 md:h-44 lg:h-72"
              >
                <img src={active.left[1]} alt="Gallery" loading="lazy" className={imgClass} />
              </motion.div>
            </AnimatePresence>

            <div className="flex w-[25%] items-center gap-5">
              <div className="flex flex-col items-center justify-center gap-6">
                {groups.map((g, i) => (
                  <h2 key={g.word} className={wordClass(i === index)}>
                    {g.word}
                  </h2>
                ))}
              </div>
              <div className="pointer-events-none hidden -translate-y-1/2 rotate-90 items-center gap-2 text-sm text-stone-500 md:flex">
                <span>scroll</span>
                <span className="h-px w-10 bg-stone-400" />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`d-r1-${index}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="relative h-28 w-[35%] self-end overflow-hidden rounded-[24px] bg-stone-100 sm:h-36 md:h-44 lg:h-64"
              >
                <img src={active.right[1]} alt="Gallery" loading="lazy" className={imgClass} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex w-full gap-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={`d-l2-${index}`}
                initial={{ opacity: 0, scale: 0.95, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.05, rotate: 3 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="relative h-28 w-[50%] overflow-hidden rounded-[24px] bg-stone-100 sm:h-36 md:h-44 lg:h-60"
              >
                <img src={active.left[2]} alt="Gallery" loading="lazy" className={imgClass} />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={`d-r2-${index}`}
                initial={{ opacity: 0, scale: 0.95, rotate: 3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.05, rotate: -3 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="relative h-28 w-[50%] overflow-hidden rounded-[24px] bg-stone-100 sm:h-36 md:h-44 lg:h-60"
              >
                <img src={active.right[2]} alt="Gallery" loading="lazy" className={imgClass} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
