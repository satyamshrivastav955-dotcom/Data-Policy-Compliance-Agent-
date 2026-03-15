import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        bg: {
          base: "#0a0e14",
          surface: "#0d1219",
          elevated: "#1a2235",
        },
        border: {
          DEFAULT: "#1e2535",
          bright: "#2a3548",
        },
        teal: {
          DEFAULT: "#1d9e75",
          dark: "#0f6e56",
          light: "#9fe1cb",
          bg: "#0f6e5618",
        },
        critical: "#c8001a",
        high: "#ef9f27",
        medium: "#1d9e75",
        red: {
          DEFAULT: "#c8001a",
          light: "#ff6b6b",
        },
        amber: "#ef9f27",
        blue: "#378add",
        text: {
          primary: "#e2e8f0",
          secondary: "#94a3b8",
          muted: "#64748b",
        },
      },
      borderRadius: {
        card: "10px",
        control: "8px",
        pill: "20px",
      },
      boxShadow: {
        card: "0 18px 45px rgba(0,0,0,0.55)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        liveDot: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.4)", opacity: "0.3" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 1.6s linear infinite",
        liveDot: "liveDot 1.5s ease-in-out infinite",
      },
      spacing: {
        page: "20px",
      },
    },
  },
  plugins: [],
};

export default config;

