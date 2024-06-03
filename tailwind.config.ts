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
        'torea': {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a4b3fd',
          400: '#808af9',
          500: '#6264f2',
          600: '#4f45e6',
          700: '#4337cb',
          800: '#372fa3',
          900: '#312d82',
          950: '#1e1b4b'
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
      // background: {
      //   "card-linear": "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.00) 100%)",
      // }
    },
  },
  plugins: [],
};
export default config;
