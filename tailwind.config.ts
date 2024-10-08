import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  plugins: [tailwindcssAnimate],
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColorBg: "#181818",
        secondColorBg: "#1E1E1E",

        primaryColorPink: "#EE10B0",
        primaryColorPinkHover: "#D60E9E",
        lightPink: "#FDE7F7",
        lightPinkHover: "#FCDBF3",
        darkPink:"#B30C84",
        darkPinkHover: "#8F0A6A",
        darkerPink: "#53063E",

        primaryColorBlue: "#0E9EEF",
        primaryColorBlueHover: "#0D8ED7",
        lightBlue: "#E7F5FD",
        lightBlueHover: "#DBF0FD",
        darkBlue: "#0B77B3",
        darkBlueHover: "#085F8F",
        darkerBlue: "#053754",


        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        t1: ["36px", { fontWeight: "650" }],
        h1: ["32px", { fontWeight: "550" }],
        h2: ["22px", { fontWeight: "550" }],
        h3: ["18px", { fontWeight: "550" }],
        h4: ["14px", { fontWeight: "400" }],
        textBig: ["18px", { fontWeight: "200" }],
        textMedium: ["14px", { fontWeight: "200" }],
        textSmall: ["12px", { fontWeight: "100" }],
      },
    },
  },
};

export default config;
