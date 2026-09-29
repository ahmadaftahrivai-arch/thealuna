"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxBanner({
  bannerImage,
  bannerLabel,
}: {
  bannerImage: string;
  bannerLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div
      ref={ref}
      className="relative min-h-[40vh] overflow-hidden rounded-2xl lg:min-h-[50vh]"
    >
      <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
        <Image
          src={bannerImage}
          alt={bannerLabel}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute left-0 top-0 bg-white py-2 pb-2 pl-2 pr-3 text-center text-lg font-semibold text-[#221604] lg:py-5 lg:pb-5 lg:pl-4 lg:pr-5 lg:text-start lg:text-5xl">
        {bannerLabel}
      </div>
    </div>
  );
}
