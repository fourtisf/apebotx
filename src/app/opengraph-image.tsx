import { ImageResponse } from "next/og";

export const alt = "ApeBotX — Solana smart-money bot for Telegram & X";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded 1200×630 social card (replaces the old placeholder SVG). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 76,
          background:
            "linear-gradient(135deg, #05060a 0%, #0c1016 52%, #071a17 100%)",
          color: "#f3f5f7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 62,
              height: 62,
              borderRadius: 17,
              background: "#000000",
              boxShadow: "0 0 26px rgba(36,229,166,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
              <defs>
                <linearGradient id="og-brand" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#6bffd1" />
                  <stop offset="0.55" stopColor="#24e5a6" />
                  <stop offset="1" stopColor="#2ad6d0" />
                </linearGradient>
              </defs>
              <path
                d="M7 25 L16 9.4 L25 25"
                stroke="url(#og-brand)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.4 18.4 H20.6"
                stroke="url(#og-brand)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="16" cy="6.4" r="2.2" fill="url(#og-brand)" />
            </svg>
          </div>
          <div style={{ fontSize: 38, fontWeight: 700 }}>ApeBotX</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 4,
              color: "#9fe9d5",
              fontWeight: 600,
            }}
          >
            SOLANA SMART-MONEY BOT · TELEGRAM + X
          </div>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.08 }}>
            Automate the smartest money on Solana.
          </div>
          <div style={{ fontSize: 30, color: "#97a0ad" }}>
            Scored wallets · anti-rug fused · real-time alerts on Telegram &amp; X.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#97a0ad",
          }}
        >
          <div>apebotx.io</div>
          <div>powered by Fourtis</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
