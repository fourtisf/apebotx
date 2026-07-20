import { cn } from "@/lib/cn";

/**
 * ApeBotX mark — an upward "apex" chevron (the A of Ape, smart-money up-only)
 * crowned by a glowing signal node (the bot's beacon), in premium emerald→teal
 * (`--brand-hi → --brand-lo → --accent-2`, lit from the top) on a pure-black,
 * borderless tile with a soft emerald glow. Reads as an A, a signal antenna and
 * a bot at once; stays legible down to favicon sizes. Themeable via brand tokens.
 */
export function ApeBotXMonogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      role="img"
      aria-label="ApeBotX"
    >
      <defs>
        <linearGradient id="apebotx-brand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--brand-hi)" />
          <stop offset="0.55" stopColor="var(--brand)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
        <filter
          id="apebotx-glow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.7" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* pure-black, borderless tile */}
      <rect x="0" y="0" width="32" height="32" rx="9" fill="#000000" />
      <g
        filter="url(#apebotx-glow)"
        stroke="url(#apebotx-brand)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* apex chevron — the "A" of Ape, rising */}
        <path d="M7 25 L16 9.4 L25 25" />
        {/* crossbar */}
        <path d="M11.4 18.4 H20.6" />
      </g>
      {/* signal beacon node crowning the apex (the "bot") */}
      <circle
        cx="16"
        cy="6.4"
        r="2.15"
        fill="url(#apebotx-brand)"
        filter="url(#apebotx-glow)"
      />
    </svg>
  );
}

/**
 * @deprecated Use {@link ApeBotXMonogram}. Kept as a stable alias so existing
 * imports keep resolving to the canonical mark.
 */
export const ApeBotXMark = ApeBotXMonogram;

/** Wordmark lockup: monogram + "ApeBotX" + optional "powered by Fourtis". */
export function BrandLockup({
  poweredBy,
  className,
}: {
  poweredBy?: string;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <ApeBotXMonogram className="h-8 w-8 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-semibold tracking-tight text-text">
          ApeBot
          <span className="text-brand-gradient">X</span>
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
