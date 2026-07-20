/**
 * Central site constants — single source of truth for URLs, handles and brand
 * metadata reused across SEO, JSON-LD, sitemap and the footer.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://apebotx.io";

export const SITE_NAME = "ApeBotX";
export const SITE_TAGLINE = "Automate the smartest money on Solana.";
export const SITE_DESCRIPTION =
  "ApeBotX is a Solana-first memecoin smart-money bot. It scores profitable on-chain wallets and fires the signal the second they ape in — segmented Smart, Sniper, Insider and KOL flows, anti-rug fused, delivered on Telegram and X in your language. Powered by Fourtis.";

// Social / community
export const X_HANDLE = "apebotx";
export const X_URL = "https://x.com/apebotx";
export const TELEGRAM_MAIN = "https://t.me/apebotx";
export const TELEGRAM_BOT_HANDLE = "apebotx_bot";
export const TELEGRAM_BOT_URL = "https://t.me/apebotx_bot";
export const TELEGRAM_ALERTS_HANDLE = "apebotxsignals";
export const TELEGRAM_ALERTS_URL = "https://t.me/apebotxsignals";

export const FOURTIS_URL = "https://fourtis.io";
