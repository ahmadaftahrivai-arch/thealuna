import Image from "next/image";

const ICON_RATIO = 461 / 420;

const sizes = {
  sm: { iconHeight: 32, text: "text-xl", gap: "gap-2.5" },
  lg: { iconHeight: 64, text: "text-4xl", gap: "gap-4" },
} as const;

export function Logo({
  label,
  size = "sm",
  variant = "brown",
  className = "",
}: {
  label: string;
  size?: keyof typeof sizes;
  variant?: "brown" | "white";
  className?: string;
}) {
  const s = sizes[size];
  const iconSrc =
    variant === "white"
      ? "/images/logo-mark-white.png"
      : "/images/logo-mark.png";
  const textColor = variant === "white" ? "text-white" : "text-[#735E4A]";

  return (
    <span className={`inline-flex items-center ${s.gap} ${className}`}>
      <Image
        src={iconSrc}
        alt=""
        width={Math.round(s.iconHeight / ICON_RATIO)}
        height={s.iconHeight}
        style={{ height: s.iconHeight, width: "auto" }}
      />
      <span className={`font-serif tracking-tight ${s.text} ${textColor}`}>
        {label}
      </span>
    </span>
  );
}
