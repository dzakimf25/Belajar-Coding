import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "landspire_black": "#2b2b2b",
        "landspire_red":"#b51f1f",
        "landspire_blue":"#003f6b",
        "landspire_yellow":"#FFBA35",
        "landspire_white":"#ffffff",
        "landspire_gray":"#f2f2f2",
        "landspire_dark_gray":"#a9a9a9",
        "landspire_pastel":"#d9d9d9"
      },
      gridTemplateColumns: {
        "form": "1fr 2fr 1fr"
      },
    },
  },
  plugins: [],
};
export default config;
