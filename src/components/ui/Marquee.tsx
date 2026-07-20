import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Seamless horizontal marquee. Renders its children twice back-to-back and
 * translates the track by -50% so the loop is invisible. Pauses on hover; the
 * edges fade via `.marquee-mask`. Respects reduced motion (the CSS animation is
 * neutralised globally under prefers-reduced-motion).
 */
export function Marquee({
  children,
  durationSec = 40,
  className,
}: {
  children: ReactNode;
  durationSec?: number;
  className?: string;
}) {
  return (
    <div className={cn("marquee-track marquee-mask overflow-hidden", className)}>
      <div
        className="marquee"
        style={{ ["--marquee-duration" as string]: `${durationSec}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
