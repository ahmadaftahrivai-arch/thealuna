"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type Offer =
  | { title: string; percentage: number }
  | { title: string; voucher: true };

const DEFAULT_OFFERS: Offer[] = [
  { title: "Book by\nWhatsApp", percentage: 10 },
  { title: "Book from\nWebsite", percentage: 10 },
  { title: "Free\nBreakfast", voucher: true },
  { title: "Late\nCheckout", voucher: true },
  { title: "Airport\nPickup", voucher: true },
];

function offerLabel(offer: Offer) {
  return "percentage" in offer ? `${offer.percentage}% off` : "Voucher";
}

export function OffersCarousel({
  offers = DEFAULT_OFFERS,
}: {
  offers?: Offer[];
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % offers.length);
    }, 3000);
    return () => clearInterval(id);
  }, [offers.length]);

  return (
    <div className="flex w-full flex-col">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center justify-between px-4 sm:px-7"
      >
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          Offers
        </h2>
      </motion.div>

      {/* Desktop: full-width snap cards */}
      <div className="no-scrollbar mx-4 mt-6 hidden gap-2 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory lg:mx-7 lg:flex lg:gap-6">
        {offers.map((offer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
            className="flex w-full shrink-0 flex-col gap-2 rounded-xl bg-white p-1 snap-center lg:gap-8 lg:rounded-[2rem] lg:p-2"
          >
            <div className="mx-1.5 my-2 flex-1 text-sm font-semibold whitespace-pre-line text-[#221604] lg:mx-6 lg:my-4 lg:text-3xl">
              {offer.title}
            </div>
            <div className="w-full items-end rounded-b-xl bg-gradient-to-b from-[#3D2709] to-[#211503] px-2 py-2 text-end text-sm font-semibold text-white lg:rounded-b-[2rem] lg:px-6 lg:text-3xl">
              {offerLabel(offer)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile: auto-advancing single card + dots */}
      <div className="mx-4 mt-6 flex flex-col items-center gap-4 lg:hidden">
        <div
          className="relative w-full overflow-hidden"
          style={{ minHeight: 160 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="flex w-full flex-col gap-2 rounded-2xl bg-white p-1"
            >
              <div className="mx-3 my-3 flex-1 whitespace-pre-line text-xl font-semibold text-[#221604]">
                {offers[index].title}
              </div>
              <div className="w-full rounded-b-2xl bg-gradient-to-b from-[#3D2709] to-[#211503] px-4 py-3 text-end text-xl font-semibold text-white">
                {offerLabel(offers[index])}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex gap-2">
          {offers.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show offer ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                i === index ? "scale-125 bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        className="mt-2 self-center text-base text-white/70 lg:mt-6 lg:text-2xl"
      >
        *contact us for validity &amp; how to redeem
      </motion.span>
    </div>
  );
}
