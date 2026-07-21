import type { LocaleDict } from "./types";

/** Indonesian scaffold — high-value strings translated; the rest deep-merges from en.ts.
 *  TODO: complete translation pass before launching the ID market. */
export const id: LocaleDict = {
  meta: {
    title: "Ocolos — Otomatiskan uang terpintar di Solana",
    description:
      "Bot smart-money memecoin berbasis Solana. Skor dompet untung, segmentasi (Smart / Sniper / Insider / KOL), dan dapatkan alert real-time di X dalam bahasamu. Didukung oleh Fourtis.",
  },
  nav: {
    links: {
      features: "Fitur",
      how: "Cara kerja",
      channels: "Saluran",
      pricing: "Harga",
    },
    cta: "Dapatkan Akses Awal",
  },
  hero: {
    badge: "Bot smart-money berbasis Solana",
    h1: "Otomatiskan uang terpintar di Solana.",
    sub: "Ocolos menilai dompet on-chain yang untung dan mengirim sinyal begitu mereka masuk — tersegmentasi, anti-rug, dan dikirim langsung ke X dalam bahasa Anda.",
    ctaPrimary: "Dapatkan Akses Awal",
    ctaSecondary: "Lihat cara kerjanya",
  },
};
