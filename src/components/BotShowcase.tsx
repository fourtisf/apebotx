"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Heart, Repeat2, MessageCircle, BarChart3 } from "lucide-react";
import { ApeBotXMonogram } from "@/components/Brand";

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

interface Signal {
  emoji: string;
  token: string;
  amount: string;
  mc: string;
  wallet: string;
  win: number;
  liq: string;
}

const SIGNALS: Signal[] = [
  { emoji: "🐳", token: "GIGA", amount: "$25K", mc: "$2M", wallet: "AKCS…YpWE", win: 78, liq: "$180K" },
  { emoji: "🟢", token: "POPCAT", amount: "$12K", mc: "$180M", wallet: "7bBo…geeE", win: 71, liq: "$1.4M" },
  { emoji: "🐳", token: "PNUT", amount: "$31K", mc: "$410M", wallet: "mPD7…Vgzb", win: 82, liq: "$3.2M" },
  { emoji: "🟢", token: "MOODENG", amount: "$8.4K", mc: "$95M", wallet: "TJnb…KTST", win: 65, liq: "$620K" },
];

/**
 * The signature hero visual — one smart-money signal, delivered to BOTH channels
 * at once: a Telegram alert bubble AND an auto-posted X card. Deliberately unlike
 * a data-grid feed; it shows the product IS a bot that lives on Telegram + X.
 * Populated on mount (client-only) to avoid a hydration mismatch.
 */
export function BotShowcase() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % SIGNALS.length), 3800);
    return () => clearInterval(id);
  }, [reduce]);

  const s = SIGNALS[i];

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* Telegram alert card */}
      <div className="gradient-border">
        <div className="glass overflow-hidden rounded-2xl">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-[linear-gradient(150deg,#2AABEE,#229ED9)] text-white">
                <TelegramLogo className="h-4 w-4" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-text">ApeBotX Signals</div>
                <div className="font-mono text-[0.62rem] text-text-muted">@apebotxsignals</div>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="pulse-dot inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Live
            </span>
          </div>

          <div className="min-h-[9.5rem] px-4 py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={mounted ? i : "seed"}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl rounded-tl-md border border-[color:color-mix(in_srgb,var(--accent)_22%,var(--border))] bg-[color:color-mix(in_srgb,var(--accent)_7%,var(--surface))] p-3.5"
              >
                <p className="text-[0.95rem] font-semibold text-text">
                  {s.emoji} {s.emoji === "🐳" ? "Whale" : "Smart money"} bought{" "}
                  <span className="text-brand-gradient">{s.amount}</span> of{" "}
                  <span className="font-mono">${s.token}</span> at {s.mc} MC
                </p>
                <p className="mt-1.5 font-mono text-xs text-text-muted">
                  {s.wallet} · {s.win}% win-rate wallet
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.68rem] text-text-muted">
                  <span className="inline-flex items-center gap-1 text-accent">
                    <ShieldCheck className="h-3.5 w-3.5" /> safe
                  </span>
                  <span>💧 {s.liq} liq</span>
                  <span className="inline-flex items-center gap-1">
                    <BarChart3 className="h-3.5 w-3.5" /> Chart
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* flow connector: same signal → auto-posted to X */}
      <div className="relative z-10 mx-auto -my-2 flex w-fit items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg)] px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-text-muted shadow-[0_8px_24px_-12px_rgba(0,0,0,0.9)]">
        auto-posted to
        <XLogo className="h-3 w-3 text-text" />
      </div>

      {/* X post card — offset right for a layered, dual-channel look */}
      <div className="ml-auto w-[94%]">
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-2.5">
            <ApeBotXMonogram className="h-9 w-9 shrink-0" />
            <div className="flex min-w-0 items-center gap-1.5">
              <span className="text-sm font-semibold text-text">ApeBotX</span>
              <span className="truncate font-mono text-xs text-text-muted">@apebotx · now</span>
            </div>
            <XLogo className="ml-auto h-4 w-4 text-text-muted" />
          </div>
          <p className="mt-2.5 text-[0.9rem] leading-relaxed text-text">
            {s.emoji} A smart-money {s.emoji === "🐳" ? "whale" : "wallet"} just bought{" "}
            {s.amount} of{" "}
            <span className="text-accent">${s.token}</span> at {s.mc} MC ·{" "}
            {s.win}% win-rate.
          </p>
          <div className="mt-3 flex items-center gap-6 text-text-muted">
            <span className="inline-flex items-center gap-1.5 text-xs">
              <MessageCircle className="h-3.5 w-3.5" /> 24
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs">
              <Repeat2 className="h-3.5 w-3.5" /> 63
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs">
              <Heart className="h-3.5 w-3.5 text-red" /> 208
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
