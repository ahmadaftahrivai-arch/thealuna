import Link from "next/link";
import { getProperties } from "@/lib/data";
import { brand } from "@/lib/brand";
import { Logo } from "@/components/logo";
import { buildWhatsAppHref, inquiryMessage } from "@/lib/whatsapp";

export async function Footer() {
  const properties = await getProperties();

  return (
    <footer id="footer" className="scroll-mt-20 bg-gradient-to-b from-[#3D2709] to-[#211503] text-white">
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-8 lg:pt-16">
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:gap-12">
          <div className="w-full lg:w-1/2">
            <Logo label={brand.name} variant="white" />
            <p className="mt-2 max-w-md text-sm text-white/70">
              {brand.tagline}
            </p>

            <div className="mt-6 space-y-4">
              {properties.map((property) => (
                <p key={property.id} className="text-sm leading-relaxed text-white/70">
                  <span className="text-xs uppercase tracking-wider text-white/50">
                    {property.name}
                  </span>
                  <br />
                  {property.location}
                </p>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/4">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-white/50">
              Navigate
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/#about" className="text-white transition-colors hover:text-white/70">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#locations" className="text-white transition-colors hover:text-white/70">
                  Accommodations
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="text-white transition-colors hover:text-white/70">
                  Gallery
                </Link>
              </li>
              <li>
                <a
                  href={buildWhatsAppHref(inquiryMessage(brand.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white transition-colors hover:text-white/70"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-6 border-t border-white/10" />

        <p className="text-center text-sm text-white/50">
          &copy; {brand.name} {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
