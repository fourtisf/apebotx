import { cn } from "@/lib/cn";

/**
 * Ocolos mark — a geometric **bot head**: a hexagon head with two eyes, a small
 * mouth, and an antenna crowned by a glowing signal-beacon node. In electric
 * violet→cyan (`--brand-hi → --brand → --accent-2`), lit from the top, with a
 * soft glow. Reads instantly as "bot" and stays legible down to favicon sizes.
 * No enclosing tile — the mark floats — so it's a clean break from the old brand.
 */
export function OcolosMonogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      role="img"
      aria-label="Ocolos"
    >
      <defs>
        <linearGradient id="ocolos-brand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--brand-hi)" />
          <stop offset="0.55" stopColor="var(--brand)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
        <filter
          id="ocolos-glow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#ocolos-glow)">
        {/* antenna + signal beacon */}
        <circle cx="16" cy="4.4" r="1.7" fill="url(#ocolos-brand)" />
        <line
          x1="16"
          y1="6"
          x2="16"
          y2="8.7"
          stroke="url(#ocolos-brand)"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
        {/* hexagon head */}
        <path
          d="M16 8.7 L24.7 13.35 L24.7 22 L16 26.7 L7.3 22 L7.3 13.35 Z"
          fill="none"
          stroke="url(#ocolos-brand)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* eyes */}
        <circle cx="12.6" cy="17.2" r="1.7" fill="url(#ocolos-brand)" />
        <circle cx="19.4" cy="17.2" r="1.7" fill="url(#ocolos-brand)" />
        {/* mouth */}
        <line
          x1="13"
          y1="21.6"
          x2="19"
          y2="21.6"
          stroke="url(#ocolos-brand)"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/**
 * @deprecated Use {@link OcolosMonogram}. Kept as a stable alias so existing
 * imports keep resolving to the canonical mark.
 */
export const OcolosMark = OcolosMonogram;

/** Wordmark lockup: monogram + "Ocolos". */
export function BrandLockup({
  poweredBy,
  className,
}: {
  poweredBy?: string;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <OcolosMonogram className="h-8 w-8 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-semibold tracking-tight text-text">
          Ocol
          <span className="text-brand-gradient">os</span>
        </span>
        {poweredBy && (
          <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-text-muted">
            {poweredBy}
          </span>
        )}
      </span>
    </span>
  );
}
