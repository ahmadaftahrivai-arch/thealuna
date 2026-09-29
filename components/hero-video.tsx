"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function HeroVideo({
  src,
  poster,
  alt,
}: {
  src: string;
  poster: string;
  alt: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
        {reducedMotion ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt={alt}
            className="h-full w-full object-cover"
          />
        ) : (
          <video
            className="h-full w-full object-cover"
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            aria-label={alt}
          />
        )}
      </motion.div>
    </div>
  );
}
