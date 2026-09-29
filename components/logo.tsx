const sizes = {
  sm: { icon: "h-8 w-8 text-base", text: "text-xl", gap: "gap-2.5" },
  lg: { icon: "h-14 w-14 text-2xl", text: "text-4xl", gap: "gap-4" },
} as const;

export function Logo({
  label,
  size = "sm",
  className = "",
}: {
  label: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const s = sizes[size];

  return (
    <span className={`inline-flex items-center ${s.gap} ${className}`}>
      <span
        aria-hidden="true"
        className={`flex shrink-0 items-center justify-center rounded-[4px] border border-current font-serif ${s.icon}`}
      >
        A
      </span>
      <span className={`font-serif tracking-tight ${s.text}`}>{label}</span>
    </span>
  );
}
