import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body:    ["DM Sans", "sans-serif"],
        mono:    ["DM Mono", "monospace"],
      },
      colors: {
        bg:           "#050505",
        surface:      "#0d0d0d",
        "surface-2":  "#141414",
        "surface-3":  "#1c1c1c",
        border:       "#222222",
        "border-2":   "#2e2e2e",
        accent:       "#e8e8e8",
        "accent-dim": "#777777",
        "accent-bright": "#ffffff",
        text: {
          primary:   "#f0f0f0",
          secondary: "#646464",
          muted:     "#303030",
        },
      },
    },
  },
  plugins: [],
};

export default config;
