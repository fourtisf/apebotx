import type { LocaleDict } from "./types";

/** Chinese (Simplified) scaffold — high-value strings translated; the rest deep-merges from en.ts.
 *  TODO: complete translation pass before launching the ZH market. */
export const zh: LocaleDict = {
  meta: {
    title: "ApeBotX — 自动跟随 Solana 上最聪明的资金",
    description:
      "面向 Solana 的 memecoin 聪明钱机器人。为盈利钱包评分并分类（聪明 / 狙击 / 内部 / KOL），并以你的语言通过 Telegram 和 X 实时推送提醒。由 Fourtis 提供支持。",
  },
  nav: {
    links: {
      features: "功能",
      how: "运作方式",
      channels: "渠道",
      pricing: "定价",
    },
    cta: "获取抢先体验",
  },
  hero: {
    badge: "Solana 聪明钱机器人",
    h1: "自动跟随 Solana 上最聪明的资金。",
    sub: "ApeBotX 为盈利的链上钱包评分，并在它们买入的那一刻发出信号——已分类、融合防 rug 检测，并以你的语言通过 Telegram 和 X 直达。",
    ctaPrimary: "获取抢先体验",
    ctaSecondary: "了解运作方式",
  },
};
