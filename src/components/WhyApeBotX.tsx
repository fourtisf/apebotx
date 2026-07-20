"use client";

import { Check, Minus } from "lucide-react";
import { useStrings } from "@/lib/strings";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

function Cell({
  value,
  positive = false,
}: {
  value: boolean | string;
  positive?: boolean;
}) {
  if (typeof value === "string") {
    return (
      <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
        {value}
      </span>
    );
  }
  if (value) {
    return positive ? (
      <span className="mx-auto inline-flex h-6 w-6 items-center justify-center rounded-full bg-[linear-gradient(150deg,var(--brand-hi),var(--brand-lo))] text-[#04140e] shadow-[0_0_16px_-4px_color-mix(in_srgb,var(--accent)_80%,transparent)]">
        <Check className="h-3.5 w-3.5" strokeWidth={3} aria-label="Yes" />
      </span>
    ) : (
      <Check className="mx-auto h-5 w-5 text-text-muted" aria-label="Yes" />
    );
  }
  return (
    <Minus className="mx-auto h-5 w-5 text-text-muted opacity-40" aria-label="No" />
  );
}

export function WhyApeBotX() {
  const { strings } = useStrings();
  const w = strings.why;

  return (
    <section className="section">
      <div className="container-content">
        <SectionHeading kicker={w.kicker} title={w.title} sub={w.sub} />
        <Reveal delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-2xl gradient-border">
            <div className="glass overflow-x-auto rounded-2xl">
              <table className="w-full min-w-[34rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="px-5 py-4 text-sm font-medium text-text-muted sm:px-6">
                      {w.columns.feature}
                    </th>
                    <th className="relative px-4 py-4 text-center text-sm font-semibold sm:px-6">
                      <span className="text-brand-gradient">{w.columns.apebotx}</span>
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-x-2 inset-y-0 -z-0 rounded-t-xl bg-[color:color-mix(in_srgb,var(--accent)_8%,transparent)]"
                      />
                    </th>
                    <th className="px-4 py-4 text-center text-sm font-medium text-text-muted sm:px-6">
                      {w.columns.generic}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {w.rows.map((row, i) => (
                    <tr
                      key={row.label}
                      className={cn(
                        "border-t border-[var(--border)]",
                        i % 2 ? "bg-[var(--surface)]/30" : "bg-transparent",
                      )}
                    >
                      <td className="px-5 py-4 text-sm text-text sm:px-6">
                        {row.label}
                      </td>
                      <td className="bg-[color:color-mix(in_srgb,var(--accent)_6%,transparent)] px-4 py-4 text-center sm:px-6">
                        <Cell value={row.apebotx} positive />
                      </td>
                      <td className="px-4 py-4 text-center sm:px-6">
                        <Cell value={row.generic} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
