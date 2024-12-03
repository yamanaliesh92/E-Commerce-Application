import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#1D4ED8",
        secondary: "#FCA5A5",
        destructive: "#FF6347",
      },
    },
  },
  plugins: [require("tailwindcss-rtl")],
  darkMode: "class",
} satisfies Config;
