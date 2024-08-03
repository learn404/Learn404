import type { Config } from "tailwindcss";
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx, jsx, mdx, js}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./app/**/*.{js,jsx,ts,tsx, mdx}",
    "./src/**/*.{js,jsx,ts,tsx, mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
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
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        moveX: {
          "0%": { transform: "translate3D(100%, 100%, 0)", easing: "ease-in" },

          "30%": { transform: "translate3D(-100%, -100%, 0) scale(1)", easing: "ease-out" },
          "35%": { transform: "translate3D(-100%, -100%, 0) scale(0.9)", easing: "ease-out" }, // 
          "40%": { transform: "translate3D(-100%, -100%, 0) scale(1)", easing: "ease-in-out" },
      
          "60%": { transform: "translate3D(60%, -60%, 0)scale(1)", easing: "ease-in-out" }, 
          "65%": { transform: "translate3D(60%, -60%, 0)scale(0.9)", easing: "ease-in-out" },
          "70%": { transform: "translate3D(60%, -60%, 0)scale(1)", easing: "ease-in-out" },
          "90%": { transform: "translate3D(100%, 100%, 0)", easing: "ease-in"  },
          "100%": { transform: "translate3D(100%, 100%, 0)", easing: "ease-in"  },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        popup: "popup 0.3s ease-in-out",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        shimmer: "shimmer 8s infinite",
        grid: "grid 15s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        moveX: "moveX 5s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar"),
  ],
} satisfies Config;

export default config;