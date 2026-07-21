/**
 * EN — default dictionary and the canonical shape for every other locale.
 * ALL user-facing copy lives here (no hardcoded strings in components).
 * Other locales are typed as DeepPartial<Strings> and deep-merged over this.
 */
export const en = {
  meta: {
    title: "Ocolos — Automate the smartest money on Solana",
    description:
      "Solana-first memecoin smart-money bot. Score profitable wallets, segment them (Smart / Sniper / Insider / KOL), fuse anti-rug signals, and get real-time alerts on Telegram and X in your language. Powered by Fourtis.",
  },

  nav: {
    brand: "Ocolos",
    poweredBy: "powered by Fourtis",
    links: {
      features: "Features",
      how: "How it works",
      channels: "Channels",
      terminal: "Terminal",
      pricing: "Pricing",
    },
    cta: "Get Early Access",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  hero: {
    badge: "Solana-first smart-money bot",
    statusBeta: "Private beta",
    h1: "Automate the smartest money on Solana.",
    sub: "Ocolos scores profitable on-chain wallets and fires the signal the second they ape in — segmented, anti-rug fused, and delivered on Telegram and X in your language.",
    ctaPrimary: "Get Early Access",
    ctaSecondary: "See how it works",
    ctaTerminal: "Open the terminal",
    highlights: ["Sub-second alerts", "Telegram + X native", "Anti-rug fused"],
    stats: {
      segments: { value: 4, decimals: 0, suffix: "", label: "Wallet segments" },
      channels: { value: 2, decimals: 0, suffix: "", label: "Native channels (TG · X)" },
      languages: { value: 5, decimals: 0, suffix: "", label: "Languages at launch" },
    },
    feed: {
      title: "Smart Money Feed",
      live: "PREVIEW",
      note: "Sample data · private beta",
      buy: "BUY",
      sell: "SELL",
    },
  },

  trust: {
    label: "Incubated & powered by Fourtis",
    chains: ["Solana", "BSC", "Base", "Ethereum", "Tron"],
  },

  problem: {
    kicker: "The problem",
    title: "Memecoins move in seconds. You find out in minutes.",
    body: "By the time a token hits your timeline, the smart money is already taking profit. Generic trackers drown you in noise — every wallet looks the same, alerts arrive late, and rugs slip through. You need to know who is buying, why it matters, and you need to know now.",
    points: [
      {
        title: "Signal buried in noise",
        body: "Thousands of wallets, no way to tell a sniper bot from a proven winner.",
      },
      {
        title: "Alerts that arrive late",
        body: "Email digests and laggy dashboards cost you the entry that mattered.",
      },
      {
        title: "Rugs dressed as moonshots",
        body: "Honeypots and mint authorities hide in plain sight until it's too late.",
      },
    ],
  },

  features: {
    kicker: "What you get",
    title: "An edge built from on-chain truth.",
    sub: "Six systems working together to turn raw Solana activity into decisions you can act on — pushed straight to Telegram and X.",
    items: [
      {
        icon: "Crosshair",
        title: "Smart Money Tracking",
        body: "We continuously score wallets on realized PnL, win-rate and consistency — so you follow proven performers, not noise.",
      },
      {
        icon: "Layers",
        title: "Wallet Segments",
        body: "Every wallet is labeled Smart 🟣, Sniper ⚡, Insider 🔴 or KOL 🎤, so you instantly read the intent behind a buy.",
      },
      {
        icon: "TrendingUp",
        title: "Smart-Money Inflows",
        body: "See net inflows from top cohorts per token in real time — conviction you can size, not a single random buy.",
      },
      {
        icon: "ShieldCheck",
        title: "Anti-Rug Fusion",
        body: "Mint authority, LP locks, holder concentration and honeypot checks fused into every signal before it reaches you.",
      },
      {
        icon: "Send",
        title: "Telegram + X Delivery",
        body: "Sub-second alerts to Telegram the instant tracked wallets move, and auto-posted to X — no dashboards to babysit.",
      },
      {
        icon: "Languages",
        title: "Multi-language",
        body: "Native delivery in English, Indonesian, Russian, Arabic and Chinese — built for emerging markets first.",
      },
    ],
  },

  how: {
    kicker: "How it works",
    title: "From on-chain noise to a clear signal in three steps.",
    steps: [
      {
        title: "We score the wallets",
        body: "Ocolos ingests Solana activity and ranks wallets by realized profit, win-rate and behavior — then segments each one.",
      },
      {
        title: "We fuse the context",
        body: "Each move is enriched with anti-rug checks and smart-money inflow context, so a signal carries conviction, not just an address.",
      },
      {
        title: "You get the signal",
        body: "The instant tracked money buys or sells, Ocolos fires a Telegram alert and posts the highest-conviction move to X — in your language, before the crowd.",
      },
    ],
  },

  why: {
    kicker: "Why Ocolos",
    title: "Not another generic tracker.",
    sub: "The difference is segmentation, delivery and fusion — the things that actually change your entry.",
    columns: {
      feature: "Capability",
      ocolos: "Ocolos",
      generic: "Generic trackers",
    },
    rows: [
      { label: "Wallet segmentation (Smart / Sniper / Insider / KOL)", ocolos: true, generic: false },
      { label: "Telegram + X native, sub-second delivery", ocolos: true, generic: false },
      { label: "Your language (EN / ID / RU / AR / ZH)", ocolos: true, generic: false },
      { label: "Anti-rug checks fused into every signal", ocolos: true, generic: false },
      { label: "Real-time smart-money inflow context", ocolos: true, generic: "Partial" },
      { label: "Multi-chain roadmap (SOL · BSC · Base · ETH · Tron)", ocolos: true, generic: "Partial" },
    ],
  },

  channels: {
    kicker: "Where it runs",
    title: "One bot. Every channel that matters.",
    sub: "Ocolos meets the market where it already lives — real-time on Telegram, curated on X. Same engine, two native surfaces.",
    items: [
      {
        icon: "Telegram",
        name: "Telegram",
        tag: "Real-time firehose",
        body: "The full signal stream lands in your Telegram — every qualified smart-money move, with anti-rug tags, mint address, chart and socials. Slash commands (/top, /terminal, /status) on tap.",
        points: ["Sub-second push", "Inline chart + buy links", "Bot commands & channel"],
        cta: "Join the channel",
      },
      {
        icon: "X",
        name: "X (Twitter)",
        tag: "Curated & public",
        body: "The single highest-conviction buy per tick is auto-posted to X — strictly gated to stay high-signal, so the timeline reads like alpha, not noise. Built to under-post on purpose.",
        points: ["One best call per tick", "High-win-rate wallets only", "Strict anti-spam pacing"],
        cta: "Follow on X",
      },
    ],
  },

  pricing: {
    kicker: "Pricing",
    title: "Start free. Upgrade when you're winning.",
    sub: "Pay with Telegram Stars — no card, no friction.",
    comingSoon: "Coming soon",
    stars: "Pay with Telegram Stars",
    plans: [
      {
        name: "Free",
        price: "$0",
        period: "forever",
        highlighted: false,
        cta: "Get Early Access",
        features: [
          "Track a starter set of smart wallets",
          "Core Telegram alerts",
          "Basic wallet segments",
          "Community channel access",
        ],
      },
      {
        name: "Pro",
        price: "$29",
        period: "/ month",
        highlighted: true,
        cta: "Join the waitlist",
        features: [
          "Unlimited wallet tracking",
          "All segments + smart-money inflows",
          "Anti-rug fusion on every signal",
          "Priority sub-second delivery",
          "Telegram + X, all languages, custom filters",
        ],
      },
    ],
  },

  waitlist: {
    kicker: "Early access",
    title: "Get on the Ocolos waitlist.",
    sub: "Be first when we open the gates. Early members get founding-member pricing and priority alerts.",
    placeholder: "you@email.com",
    cta: "Request access",
    sending: "Sending…",
    success: "You're on the list. Watch your inbox — and Telegram.",
    errorInvalid: "Please enter a valid email address.",
    errorGeneric: "Something went wrong. Please try again.",
    telegramPrompt: "Prefer Telegram? Join",
    telegramCta: "@ocolossignals",
    disclaimer: "No spam. Unsubscribe anytime.",
  },

  footer: {
    tagline: "The smart-money bot for Solana memecoins — live on Telegram and X. Independent brand, powered by Fourtis.",
    poweredBy: "powered by Fourtis",
    rights: "All rights reserved.",
    columns: {
      product: {
        title: "Product",
        links: {
          features: "Features",
          how: "How it works",
          channels: "Channels",
          pricing: "Pricing",
        },
      },
      community: {
        title: "Community",
        links: {
          x: "X / Twitter",
          telegram: "Telegram",
          alerts: "Alerts channel",
        },
      },
      legal: {
        title: "Legal",
        links: {
          privacy: "Privacy",
          terms: "Terms",
        },
      },
    },
  },
};

export type Strings = typeof en;
