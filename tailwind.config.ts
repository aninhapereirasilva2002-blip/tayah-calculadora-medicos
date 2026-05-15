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
          red: "#8A2A2B",
          "red-dark": "#6E2122",
          "red-light": "#A8383A",
          black: "#0A0A0A",
          "gray-900": "#141414",
          "gray-800": "#1F1F1F",
          "gray-700": "#2A2A2A",
          "gray-300": "#D4D4D4",
          "gray-200": "#E5E5E5",
          white: "#FFFFFF",
          cream: "#F8F5F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-lato)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      letterSpacing: {
        widest: "0.25em",
      },
    },
  },
  plugins: [],
};

export default config;
