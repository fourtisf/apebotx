"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Wraps content in a container whose emerald radial glow follows the cursor.
 * Pure CSS var updates on mousemove (no React re-render), so it's cheap. Falls
 * back to a static, centered glow under reduced motion / on touch.
 */
export function Spotlight({
  children,
  className,
  size = 420,
}: {
  children: ReactNode;
  className?: string;
  /** Diameter of the glow in px. */
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn("group/spot relative", className)}
      style={
        {
          "--mx": "50%",
          "--my": "0px",
        } as React.CSSProperties
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 opacity-60 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(${size}px ${size}px at var(--mx) var(--my), color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
