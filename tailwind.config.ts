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
        torea: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a4b3fd",
          400: "#808af9",
          500: "#6264f2",
          600: "#4f45e6",
          700: "#4337cb",
          800: "#372fa3",
          900: "#312d82",
          950: "#1e1b4b",
        },
      },
      boxShadow: {
        "custom-shadow":
          "0px -5px 20px 0px rgba(233, 223, 255, 0.30), 0px -2px 60px 0px rgba(187, 155, 255, 0.15), 0px 0.5px 0px 0px rgba(255, 255, 255, 0.50) inset",
        "pricing-shadow":
          "0px -2px 10px 0px rgba(233, 223, 255, 0.30), 0px -2px 40px 0px rgba(187, 155, 255, 0.15), 0px 0.5px 0px 0px rgba(255, 255, 255, 0.50) inset",
      },
      backgroundColor: {
        "bg-primary": "#02030C",
        "linear-border":
          "var(--LinearBorder, linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.00) 100%))",
      },
      backgroundImage: {
        "linear-border":
          "var(--LinearBorder, linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.00) 100%))",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        popup: {
          "0%": { opacity: "0", transform: "translate(-50%, -20%)" },
          "100%": { opacity: "1", transform: "translate(-50%, -50%)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        shimmer: {
          "0%, 90%, 100%": {
            "background-position": "calc(-100% - var(--shimmer-width)) 0",
          },
          "30%, 60%": {
            "background-position": "calc(100% + var(--shimmer-width)) 0",
          },
        },
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        popup: "popup 0.3s ease-in-out",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        shimmer: "shimmer 8s infinite",
        grid: "grid 15s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
