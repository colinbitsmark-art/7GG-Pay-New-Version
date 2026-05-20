import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "var(--surface-base)",
          900: "var(--surface-raised)",
          800: "var(--surface-muted)"
        },
        gold: {
          300: "#F5D76E",
          500: "#D4AF37",
          700: "#9F7D1B"
        },
        slateText: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)"
        }
      },
      borderRadius: {
        "2xl": "1rem"
      },
      boxShadow: {
        gold: "0 0 36px rgba(212, 175, 55, 0.15)",
        panel: "0 18px 80px rgba(0, 0, 0, 0.45)"
      },
      backgroundImage: {
        "gold-radial": "radial-gradient(circle at top right, var(--gold-aura), transparent 36%)",
        "obsidian-grid":
          "linear-gradient(rgba(212, 175, 55, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.08) 1px, transparent 1px)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" }
        },
        glow: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.9" }
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" }
        }
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        glow: "glow 4s ease-in-out infinite",
        shimmer: "shimmer 1.8s infinite"
      }
    }
  },
  plugins: []
};

export default config;
