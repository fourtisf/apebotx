"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Heart, Repeat2, MessageCircle, BarChart3 } from "lucide-react";
import { OcolosMonogram } from "@/components/Brand";

/** X (Twitter) brand mark. */
function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
  ago: string;
  likes: number;
  rts: number;
  replies: number;
}

const SIGNALS: Signal[] = [
  { emoji: "🐳", token: "GIGA", amount: "$25K", mc: "$2M", wallet: "AKCS…YpWE", win: 78, liq: "$180K", ago: "now", likes: 208, rts: 63, replies: 24 },
  { emoji: "🟣", token: "POPCAT", amount: "$12K", mc: "$180M", wallet: "7bBo…geeE", win: 71, liq: "$1.4M", ago: "2m", likes: 141, rts: 38, replies: 12 },
  { emoji: "🐳", token: "PNUT", amount: "$31K", mc: "$410M", wallet: "mPD7…Vgzb", win: 82, liq: "$3.2M", ago: "4m", likes: 302, rts: 88, replies: 41 },
  { emoji: "🟣", token: "MOODENG", amount: "$8.4K", mc: "$95M", wallet: "TJnb…KTST", win: 65, liq: "$620K", ago: "6m", likes: 96, rts: 21, replies: 8 },
];

/** One X post card (the auto-posted signal). */
function Post({ s, muted = false }: { s: Signal; muted?: boolean }) {
  return (
    <div className={muted ? "opacity-60" : ""}>
      <div className="flex items-center gap-2.5">
        <OcolosMonogram className="h-9 w-9 shrink-0" />
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="text-sm font-semibold text-text">Ocolos</span>
          <span className="truncate font-mono text-xs text-text-muted">
            @Ocolosxyz · {s.ago}
          </span>
        </div>
        <XLogo className="ml-auto h-4 w-4 text-text-muted" />
      </div>
      <p className="mt-2.5 text-[0.9rem] leading-relaxed text-text">
        {s.emoji} A smart-money {s.emoji === "🐳" ? "whale" : "wallet"} just bought{" "}
        <span className="text-brand-gradient font-semibold">{s.amount}</span> of{" "}
        <span className="text-accent">${s.token}</span> at {s.mc} MC · {s.win}% win-rate.
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.68rem] text-text-muted">
        <span className="inline-flex items-center gap-1 text-accent">
          <ShieldCheck className="h-3.5 w-3.5" /> safe
        </span>
        <span>💧 {s.liq} liq</span>
        <span className="inline-flex items-center gap-1">
          <BarChart3 className="h-3.5 w-3.5" /> Chart
        </span>
      </div>
      <div className="mt-3 flex items-center gap-6 text-text-muted">
        <span className="inline-flex items-center gap-1.5 text-xs">
          <MessageCircle className="h-3.5 w-3.5" /> {s.replies}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs">
          <Repeat2 className="h-3.5 w-3.5" /> {s.rts}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs">
          <Heart className="h-3.5 w-3.5 text-red" /> {s.likes}
        </span>
      </div>
    </div>
  );
}

/**
 * The signature hero visual — a live X feed of Ocolos's auto-posted signals.
 * X-only: the product broadcasts the sharpest smart-money moves straight to X.
 * SIGNALS[0] is deterministic so the first render matches on server + client.
 */
export function BotShowcase() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % SIGNALS.length), 3800);
    return () => clearInterval(id);
  }, [reduce]);

  const cur = SIGNALS[i];
  const prev = SIGNALS[(i + 1) % SIGNALS.length];

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="gradient-border">
        <div className="glass overflow-hidden rounded-2xl">
          {/* feed header */}
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-black text-white">
                <XLogo className="h-4 w-4" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-text">Ocolos on X</div>
                <div className="font-mono text-[0.62rem] text-text-muted">@Ocolosxyz</div>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="pulse-dot inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Auto-posting
            </span>
          </div>

          {/* latest post (animated) */}
          <div className="min-h-[10.5rem] px-4 py-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Post s={cur} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* previous post (dimmed) */}
          <div className="border-t border-[var(--border)] px-4 py-4">
            <Post s={prev} muted />
          </div>
        </div>
      </div>
    </div>
  );
}
