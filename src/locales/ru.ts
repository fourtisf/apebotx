import type { LocaleDict } from "./types";

/** Russian scaffold — high-value strings translated; the rest deep-merges from en.ts.
 *  TODO: complete translation pass before launching the RU market. */
export const ru: LocaleDict = {
  meta: {
    title: "Ocolos — Автоматизируй самые умные деньги в Solana",
    description:
      "Бот умных денег для мемкоинов на Solana. Оцениваем прибыльные кошельки, сегментируем (Smart / Sniper / Insider / KOL) и присылаем оповещения в реальном времени в X на вашем языке. При поддержке Fourtis.",
  },
  nav: {
    links: {
      features: "Возможности",
      how: "Как это работает",
      channels: "Каналы",
      pricing: "Цены",
    },
    cta: "Ранний доступ",
  },
  hero: {
    badge: "Бот умных денег на Solana",
    h1: "Автоматизируй самые умные деньги в Solana.",
    sub: "Ocolos оценивает прибыльные ончейн-кошельки и присылает сигнал в момент покупки — с сегментацией, анти-раг проверкой и доставкой прямо в X на вашем языке.",
    ctaPrimary: "Ранний доступ",
    ctaSecondary: "Как это работает",
  },
};
