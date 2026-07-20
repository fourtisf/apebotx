import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Adds lift + border highlight on hover. */
  interactive?: boolean;
  /** Wraps the card in an animated emerald→teal→violet gradient ring. */
  gradient?: boolean;
  className?: string;
}

export function GlassCard({
  children,
  interactive = false,
  gradient = false,
  className,
  ...rest
}: GlassCardProps) {
  const card = (
    <div
      className={cn(
        "glass p-6 sm:p-7",
        interactive &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-[color:color-mix(in_srgb,var(--accent)_40%,var(--border-strong))] hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8),0_0_0_1px_color-mix(in_srgb,var(--accent)_22%,transparent),0_22px_70px_-30px_color-mix(in_srgb,var(--accent)_45%,transparent)]",
        gradient && "!border-transparent",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );

  if (!gradient) return card;
  return <div className="gradient-border h-full">{card}</div>;
}
