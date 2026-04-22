import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body:    ["'DM Sans'", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        void:    "#020308",
        ink:     "#06070e",
        accent:  "#4DFFD2",
        glow:    "#7B61FF",
        fire:    "#FF6B35",
        gold:    "#FFD93D",
      },
      animation: {
        "float":       "float 6s ease-in-out infinite",
        "pulse-glow":  "pulseGlow 3s ease-in-out infinite",
        "spin-slow":   "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-18px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%":      { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
