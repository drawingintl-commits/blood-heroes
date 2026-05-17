import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        hero: {
          red: "#df2f3f",
          deep: "#9f1626",
          soft: "#fff1f2",
          ink: "#2d1f24"
        },
        mint: "#e9fbf7",
        cream: "#fffaf2"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(223, 47, 63, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
