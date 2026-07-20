import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-2": "var(--bg-2)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        "surface-3": "var(--surface-3)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        "text-dim": "var(--text-dim)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        "accent-3": "var(--accent-3)",
        brand: "var(--brand)",
        "brand-hi": "var(--brand-hi)",
        "brand-lo": "var(--brand-lo)",
        red: "var(--red)",
        amber: "var(--amber)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        "2xl": "var(--radius)",
        "3xl": "var(--radius-lg)",
      },
      maxWidth: {
        content: "1200px",
      },
      backgroundImage: {
        "grad-brand": "var(--grad-brand)",
        "grad-aurora": "var(--grad-aurora)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "60%, 100%": { transform: "translateX(220%)" },
        },
        "text-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        shimmer: "shimmer 2.4s ease-in-out infinite",
        "text-pan": "text-pan 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
