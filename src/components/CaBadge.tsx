"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { CA } from "@/lib/site";

/**
 * Copyable contract-address chip. The CA lives in lib/site.ts (NEXT_PUBLIC_CA
 * overrides at build time). Empty → shows "Coming soon" and copies a teaser;
 * set → shows the address and copies the real CA.
 */

function short(addr: string) {
  return addr.length > 13 ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : addr;
}

export function CaBadge({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const live = CA.length > 0;
  const label = live ? short(CA) : "Coming soon";
  const copyValue = live ? CA : "CA coming soon — follow @Ocolosxyz on X.";

  async function copy() {
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — no-op */
    }
  }

  return (
    <div className={cn("gradient-border inline-flex", className)}>
      <button
        type="button"
        onClick={copy}
        aria-label={live ? "Copy contract address" : "Contract address coming soon"}
        className="group inline-flex items-center gap-2.5 rounded-2xl bg-[var(--surface)]/80 px-4 py-2.5 font-mono text-sm backdrop-blur-md transition-colors hover:bg-[var(--surface-2)]"
      >
        <span className="text-[0.7rem] uppercase tracking-[0.14em] text-text-muted">
          CA
        </span>
        <span className="h-3.5 w-px bg-[var(--border-strong)]" aria-hidden />
        <span className={cn(live ? "text-text" : "text-brand-gradient font-semibold")}>
          {label}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1 text-xs transition-colors",
            copied ? "text-accent" : "text-text-muted group-hover:text-accent",
          )}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy
            </>
          )}
        </span>
      </button>
    </div>
  );
}
