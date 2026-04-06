import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./utils/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "rgba(255, 255, 255, 0.08)",
          strong: "rgba(255, 255, 255, 0.16)",
        },
        accent: {
          50: "#e9f5ff",
          100: "#c7e6ff",
          200: "#9dd5ff",
          300: "#6ac2ff",
          400: "#3fafff",
          500: "#1a9cff",
          600: "#0087e6",
          700: "#006bb4",
          800: "#005285",
          900: "#003b60",
        },
        glass: "rgba(255, 255, 255, 0.08)",
        dark: "#0b1021",
        muted: "#a3b1c6",
        panel: "rgba(14, 19, 34, 0.55)",
      },
      fontFamily: {
        sans: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glass: "0 10px 30px rgba(0,0,0,0.35)",
        neo: "10px 10px 30px rgba(0,0,0,0.45), -10px -10px 30px rgba(255,255,255,0.05)",
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        bounceSmooth: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
