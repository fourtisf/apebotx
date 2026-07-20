import type { LocaleDict } from "./types";

/** Arabic scaffold (RTL) — high-value strings translated; the rest deep-merges from en.ts.
 *  dir="rtl" is wired automatically for this locale in the strings provider.
 *  TODO: complete translation pass before launching the AR market. */
export const ar: LocaleDict = {
  meta: {
    title: "ApeBotX — أتمِت أذكى الأموال على سولانا",
    description:
      "بوت الأموال الذكية لعملات الميم على شبكة سولانا. نقيّم المحافظ الرابحة ونصنّفها (ذكي / قنّاص / مطّلع / مؤثّر) ونرسل تنبيهات فورية عبر تيليجرام و X بلغتك. مدعوم من Fourtis.",
  },
  nav: {
    links: {
      features: "المزايا",
      how: "كيف يعمل",
      channels: "القنوات",
      pricing: "الأسعار",
    },
    cta: "احصل على وصول مبكر",
  },
  hero: {
    badge: "بوت الأموال الذكية على سولانا",
    h1: "أتمِت أذكى الأموال على سولانا.",
    sub: "يقيّم ApeBotX المحافظ الرابحة على السلسلة ويرسل الإشارة لحظة شرائها — مصنّفة، ومدمجة بفحص مكافحة الاحتيال، وتصلك مباشرة عبر تيليجرام و X بلغتك.",
    ctaPrimary: "احصل على وصول مبكر",
    ctaSecondary: "شاهد كيف يعمل",
  },
};
