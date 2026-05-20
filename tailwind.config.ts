import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2D6A4F",
          light: "#52B788",
          dark: "#1B4332",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#52B788",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#95D5B2",
          foreground: "#1B4332",
        },
        whatsapp: "#25D366",
        background: "#F0FAF4",
        card: "#FFFFFF",
        border: "#D8F3DC",
        muted: "#F0FAF4",
        "muted-foreground": "#52796F",
        destructive: "#ef4444",
        success: "#2D6A4F",
        warning: "#F4A261",
      },
      fontFamily: {
        sans: ["Inter", "Poppins", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "0.875rem",
        md: "0.625rem",
        sm: "0.375rem",
      },
      boxShadow: {
        card: "0 2px 12px rgba(45,106,79,0.08)",
        "card-hover": "0 8px 28px rgba(45,106,79,0.15)",
        header: "0 2px 12px rgba(45,106,79,0.10)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
