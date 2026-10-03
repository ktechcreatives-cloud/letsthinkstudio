import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#FF572D",
          ink: "#171819",
          white: "#FFFFFF",
          bg: "#F5F5F3",
          secondary: "#737373",
        },
        studio: {
          orange: "#FF572D",
          ink: "#171819",
          bg: "#F5F5F3",
          surface: "#FFFFFF",
          card: "#FFFFFF",
          cardHover: "#FAFAFA",
          border: "#E5E5E0",
          borderLight: "#ECECE8",
          text: "#171819",
          muted: "#737373",
          accent: "#FF572D",
          accentHover: "#E6451B",
          accentMuted: "rgba(255, 87, 45, 0.10)",
          accentGlow: "rgba(255, 87, 45, 0.20)",
          citron: "#D4E948",
          // Dark palette for dark sections / footer
          darkBg: "#0E0E10",
          darkSurface: "#141417",
          darkBorder: "#26262B",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "Inter", "-apple-system", "sans-serif"],
        heading: ["var(--font-heading)", "Manrope", "Space Grotesk", "sans-serif"],
        display: ["var(--font-heading)", "Manrope", "sans-serif"],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "monospace",
        ],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "marquee": "marquee 35s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
