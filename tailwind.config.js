/** @type {import('tailwindcss').Config} */

const { Noto_Serif, Inter } = require("next/font/google");

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
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
        "green-100": "#F1F5F3",
        "green-200": "#E6EBE9",
        "green-300": "#D5DFDA",
        "green-400": "#ABC0B4",
        "green-500": "#81A08F",
        "green-600": "#5D7B6A",
        "green-700": "#465C50",
        "green-800": "#2F3E35",
        "green-900": "#171F1B",
        "orange-100": "#FAEDE8",
        "orange-200": "#F9DACE",
        "orange-300": "#F3B59C",
        "orange-400": "#F3B59C",
        "orange-500": "#E76B39",
        "orange-600": "#C14817",
        "orange-700": "#803010",
        "orange-800": "#631F04",
        "orange-900": "#401808",
        "gray-100": "#F6F7FC",
        "gray-200": "#F1F2F6",
        "gray-300": "#E4E6ED",
        "gray-400": "#D6D9E4",
        "gray-500": "#C8CCDB",
        "gray-600": "#9AA1B9",
        "gray-700": "#646D89",
        "gray-800": "#424C6B",
        "gray-900": "#2A2E3F",
        red: "#B61515",
        bg: "#F7F7FB",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        heading: "Noto_Serif",
        body: "Inter",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
