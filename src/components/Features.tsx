"use client";

import {
  Crosshair,
  Layers,
  TrendingUp,
  ShieldCheck,
  Send,
  Languages,
  type LucideIcon,
} from "lucide-react";
import { useStrings } from "@/lib/strings";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const ICON_MAP: Record<string, LucideIcon> = {
  Crosshair,
  Layers,
  TrendingUp,
  ShieldCheck,
  Send,
  Languages,
};

// Bento layout: a wide featured tile (0), a normal row, and a full-width closer (5).
// Perfectly tiles a 3-col grid: 2 + 1 + 1 + 1 + 1 + 3 = 9.
const SPAN = [
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-3",
];

const LANGS = ["EN", "ID", "RU", "AR", "ZH"];

/** Small static "conviction" bars for the featured tile. */
function ScoreBars() {
  const bars = [42, 68, 55, 88, 73, 96, 61];
  return (
    <div className="mt-6 flex h-16 items-end gap-1.5" aria-hidden>
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t bg-[linear-gradient(180deg,var(--brand-hi),var(--brand-lo))] opacity-80"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

export function Features() {
  const { strings } = useStrings();
  const f = strings.features;

  return (
    <section id="features" className="section">
      <div className="container-content">
        <SectionHeading kicker={f.kicker} title={f.title} sub={f.sub} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {f.items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Crosshair;
            const featured = i === 0;
            const wide = i === 5;
            const delivery = item.icon === "Send";
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.06} className={SPAN[i]}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300 sm:p-7",
                    delivery
                      ? "gradient-border"
                      : "glass hover:-translate-y-1 hover:border-[color:color-mix(in_srgb,var(--accent)_36%,var(--border-strong))]",
                  )}
                >
                  {delivery && (
                    <div className="glass absolute inset-0 -z-10 rounded-2xl" />
                  )}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle, color-mix(in srgb, var(--accent) 30%, transparent), transparent 70%)",
                    }}
                  />

                  <div className={cn(wide && "sm:max-w-md")}>
                    <span className="glow-chip inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[linear-gradient(150deg,var(--brand-hi),var(--brand-lo))] text-[#04140e]">
                      <Icon className="h-6 w-6" strokeWidth={2.2} />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold text-text">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {item.body}
                    </p>
                  </div>

                  {featured && <ScoreBars />}

                  {wide && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {LANGS.map((l) => (
                        <span
                          key={l}
                          className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1 font-mono text-xs text-text-muted"
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
