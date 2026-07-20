import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface OwnProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  href?: string;
  children: ReactNode;
}

type Props = OwnProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement> &
      AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof OwnProps
  >;

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium leading-none transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(180deg,var(--brand),var(--brand-lo))] text-white font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_30px_-10px_color-mix(in_srgb,var(--accent)_75%,transparent)] hover:brightness-[1.08] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_16px_46px_-12px_color-mix(in_srgb,var(--accent)_92%,transparent)] active:scale-[0.98]",
  secondary:
    "border border-[var(--border-strong)] bg-[var(--surface)]/60 text-text backdrop-blur-md hover:border-[color:color-mix(in_srgb,var(--accent)_45%,var(--border-strong))] hover:bg-[var(--surface-2)] active:scale-[0.98]",
  ghost: "text-text-muted hover:text-text",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
};

/** Sweeping highlight that runs across the primary button on hover. */
function Shimmer() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)] opacity-0 transition-opacity duration-200 group-hover/btn:opacity-100 group-hover/btn:animate-shimmer"
    />
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  ...rest
}: Props) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const shimmer = variant === "primary" ? <Shimmer /> : null;

  if (href !== undefined) {
    const external = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {shimmer}
        <span className="relative inline-flex items-center gap-2">
          {children}
          {external && <ArrowUpRight className="h-4 w-4" aria-hidden />}
        </span>
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {shimmer}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </button>
  );
}
