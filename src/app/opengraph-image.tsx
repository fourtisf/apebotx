import { ImageResponse } from "next/og";

export const alt = "Ocolos — Solana smart-money bot for Telegram & X";
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
            "linear-gradient(135deg, #08070e 0%, #0d0b16 52%, #12091e 100%)",
          color: "#f3f5f7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 66,
              height: 66,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              filter: "drop-shadow(0 0 18px rgba(124,77,255,0.6))",
            }}
          >
            <svg width="60" height="60" viewBox="0 0 32 32" fill="none">
              <defs>
                <linearGradient id="og-brand" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#a98bff" />
                  <stop offset="0.55" stopColor="#7c4dff" />
                  <stop offset="1" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
              <circle cx="16" cy="4.4" r="1.7" fill="url(#og-brand)" />
              <path
                d="M16 6 V8.7"
                stroke="url(#og-brand)"
                strokeWidth="1.9"
                strokeLinecap="round"
              />
              <path
                d="M16 8.7 L24.7 13.35 L24.7 22 L16 26.7 L7.3 22 L7.3 13.35 Z"
                fill="none"
                stroke="url(#og-brand)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="12.6" cy="17.2" r="1.7" fill="url(#og-brand)" />
              <circle cx="19.4" cy="17.2" r="1.7" fill="url(#og-brand)" />
              <path
                d="M13 21.6 H19"
                stroke="url(#og-brand)"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div style={{ fontSize: 38, fontWeight: 700 }}>Ocolos</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 4,
              color: "#c9bcff",
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
          <div>ocolos.fun</div>
          <div>powered by Fourtis</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
