"use client";

import { useStrings } from "@/lib/strings";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function HowItWorks() {
  const { strings } = useStrings();
  const h = strings.how;

  return (
    <section id="how" className="section">
      <div className="container-content">
        <div className="flex justify-center">
          <SectionHeading kicker={h.kicker} title={h.title} center />
        </div>

        <ol className="relative mx-auto mt-16 max-w-2xl">
          {/* vertical gradient spine */}
          <div
            aria-hidden
            className="absolute bottom-4 left-[27px] top-4 w-px bg-[linear-gradient(180deg,color-mix(in_srgb,var(--accent)_60%,transparent),color-mix(in_srgb,var(--accent-2)_50%,transparent),color-mix(in_srgb,var(--accent-3)_45%,transparent))] sm:left-[31px]"
          />
          {h.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <li className="relative flex gap-5 pb-10 last:pb-0 sm:gap-6">
                <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-[color:color-mix(in_srgb,var(--accent)_35%,var(--border-strong))] bg-[var(--surface)] font-display text-xl font-semibold text-brand-gradient shadow-[0_0_30px_-10px_color-mix(in_srgb,var(--accent)_70%,transparent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="glass flex-1 rounded-2xl p-5 sm:p-6">
                  <h3 className="text-lg font-semibold text-text">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {step.body}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
