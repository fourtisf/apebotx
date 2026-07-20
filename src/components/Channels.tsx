"use client";

import { Check, ArrowUpRight } from "lucide-react";
import { useStrings } from "@/lib/strings";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { X_URL, TELEGRAM_ALERTS_URL } from "@/lib/site";

/** X (Twitter) brand mark. */
function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/** Telegram brand mark. */
function TelegramLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212-.07-.062-.174-.041-.249-.024-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

const ICONS: Record<string, (p: { className?: string }) => JSX.Element> = {
  Telegram: TelegramLogo,
  X: XLogo,
};

const HREFS: Record<string, string> = {
  Telegram: TELEGRAM_ALERTS_URL,
  X: X_URL,
};

export function Channels() {
  const { strings } = useStrings();
  const c = strings.channels;

  return (
    <section id="channels" className="section">
      <div className="container-content">
        <div className="flex justify-center">
          <SectionHeading kicker={c.kicker} title={c.title} sub={c.sub} center />
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {c.items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? TelegramLogo;
            const href = HREFS[item.icon] ?? TELEGRAM_ALERTS_URL;
            return (
              <Reveal key={item.name} delay={i * 0.1}>
                <article className="group relative flex h-full flex-col gradient-border">
                  <div className="glass relative flex h-full flex-col overflow-hidden rounded-2xl p-7 sm:p-9">
                    {/* soft platform glow */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-3xl transition-opacity duration-300 group-hover:opacity-70"
                      style={{
                        background:
                          "radial-gradient(circle, color-mix(in srgb, var(--accent) 26%, transparent), transparent 70%)",
                      }}
                    />
                    <div className="relative flex items-center justify-between">
                      <span className="glow-chip inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(150deg,var(--brand),var(--brand-lo))] text-white">
                        <Icon className="h-7 w-7" />
                      </span>
                      <span className="kicker-pill">{item.tag}</span>
                    </div>

                    <h3 className="relative mt-6 font-display text-2xl font-semibold text-text">
                      {item.name}
                    </h3>
                    <p className="relative mt-2.5 text-sm leading-relaxed text-text-muted sm:text-base">
                      {item.body}
                    </p>

                    <ul className="relative mt-6 flex flex-col gap-2.5">
                      {item.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-2.5 text-sm text-text"
                        >
                          <Check className="h-4 w-4 shrink-0 text-accent" strokeWidth={2.4} />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <div className="relative mt-8 pt-2">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 transition-colors hover:text-brand-hi hover:underline"
                      >
                        {item.cta}
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
