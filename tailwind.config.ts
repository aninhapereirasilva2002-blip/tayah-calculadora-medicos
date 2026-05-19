import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tayah: {
          // ===== Paleta oficial (Sprint 7 retrabalho visual) =====
          // Brand
          red: "#8A2A2B",
          "red-dark": "#6E2122",
          "red-light": "#A8383A",

          // Backgrounds
          cream: "#FDF6F0", // fundo principal
          "cream-deep": "#FDEEE8", // destaque rosa-claro / zebra
          white: "#FFFFFF",

          // Texts
          "text-strong": "#1A1A1A", // texto principal (preto suave)
          "text-muted": "#666666", // texto secundário

          // Borders
          "border-soft": "#EEE5DC",
          "border-card": "#F0E5D8",

          // Accent semantics
          green: "#2E7D32",
          orange: "#D97706",

          // ===== Legacy aliases (remappeadas para a paleta nova) =====
          // Mantidas para evitar quebra das pages que ainda referenciam.
          // Serão removidas após Parts 4-8 reescreverem as pages.
          black: "#1A1A1A", // antes #0A0A0A; agora preto suave da paleta
          "gray-900": "#1A1A1A",
          "gray-800": "#FDEEE8",
          "gray-700": "#666666",
          "gray-300": "#F0E5D8",
          "gray-200": "#EEE5DC",
        },
      },
      fontFamily: {
        sans: ["var(--font-lato)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      letterSpacing: {
        widest: "0.25em",
      },
      boxShadow: {
        "tayah-card": "0 4px 24px rgba(0,0,0,0.04)",
        "tayah-card-sm": "0 2px 8px rgba(0,0,0,0.04)",
        "tayah-header": "0 1px 3px rgba(0,0,0,0.04)",
        "tayah-whatsapp": "0 4px 16px rgba(37, 211, 102, 0.4)",
        "tayah-whatsapp-hover": "0 6px 20px rgba(37, 211, 102, 0.55)",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        "fade-in-x": {
          "0%": { opacity: "0", transform: "translateX(8px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 2s ease-out infinite",
        "fade-in-x": "fade-in-x 0.5s ease-out 1s both",
      },
    },
  },
  plugins: [],
};

export default config;
