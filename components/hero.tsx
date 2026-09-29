import { HeroVideo } from "@/components/hero-video";

export function Hero({
  eyebrow,
  title,
  tagline,
}: {
  eyebrow: string;
  title: string;
  tagline: string;
}) {
  return (
    <section className="relative flex h-dvh min-h-[560px] w-full items-end">
      <HeroVideo
        src="/videos/hero.mp4"
        poster="/videos/hero-poster.jpg"
        alt={title}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#3D2709]/80 via-[#3D2709]/20 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 text-white sm:pb-20">
        <p className="animate-fade-in text-xs uppercase tracking-[0.3em] text-white/80">
          {eyebrow}
        </p>
        <h1 className="animate-fade-in-up mt-4 font-semibold text-5xl leading-[1.05] sm:text-7xl">
          {title}
        </h1>
        <p className="animate-fade-in-up mt-4 max-w-md text-sm uppercase tracking-[0.2em] text-white/70">
          {tagline}
        </p>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 animate-bounce text-white/70">
        ↓
      </div>
    </section>
  );
}
