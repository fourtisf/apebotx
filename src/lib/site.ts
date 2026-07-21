/**
 * Central site constants — single source of truth for URLs, handles and brand
 * metadata reused across SEO, JSON-LD, sitemap and the footer.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://ocolos.xyz";

export const SITE_NAME = "Ocolos";
export const SITE_TAGLINE = "Automate the smartest money on Solana.";
export const SITE_DESCRIPTION =
  "Ocolos is a Solana-first memecoin smart-money bot. It scores profitable on-chain wallets and fires the signal the second they ape in — segmented Smart, Sniper, Insider and KOL flows, anti-rug fused, auto-posted straight to X.";

// $OCOLOS token contract address. NEXT_PUBLIC_CA overrides at build time; the
// fallback is the launched CA so the site shows it even without the env var.
export const CA =
  process.env.NEXT_PUBLIC_CA?.trim() ||
  "0x5692ea2bba17c848e531eccba64e8bb231d94acc";

// Social / community
export const X_HANDLE = "Ocolosxyz";
export const X_URL = "https://x.com/Ocolosxyz";
export const TELEGRAM_MAIN = "https://t.me/ocolos";
export const TELEGRAM_BOT_HANDLE = "ocolos_bot";
export const TELEGRAM_BOT_URL = "https://t.me/ocolos_bot";
export const TELEGRAM_ALERTS_HANDLE = "ocolossignals";
export const TELEGRAM_ALERTS_URL = "https://t.me/ocolossignals";

