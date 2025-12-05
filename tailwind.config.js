/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./**/*.{ts,tsx}"],
  theme: {
    screens: {
      xs: "360px",
      ...defaultTheme.screens,
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      boxShadow: {},
      fontSize: {
        "xs+": "0.8125rem",
        "sm+": "0.9375rem",
        "base+": "1.0625rem",
        "xl+": "1.375rem",
        "2xl+": "1.5625rem",
        "3xl+": "2rem",
        "5xl+": "3.1rem",
        "6xl+": "4rem",
        "7xl+": "5rem",
      },
      transitionDuration: {
        400: "400ms",
        600: "600ms",
        1500: "1500ms",
        10000: "10000ms",
      },
      backgroundImage: {},
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary-color))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary-color))",
        },
        border: {
          DEFAULT: "hsl(var(--border-color))",
        },
        success: {
          DEFAULT: "#62ba2b",
        },
        ghost: {
          DEFAULT: "hsl(var(--ghost-color))",
          hover: "hsl(var(--ghost-hover-color))",
        },

        background: "hsl(var(--background))",

        foreground: "hsl(var(--foreground))",

        text: {
          body: "hsl(var(--text-body))",
          title: "hsl(var(--text-title))",
        },

        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {},
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0deg) scale(10)" },
          "100%": { transform: "rotate(-360deg) scale(10)" },
        },
        "accordion-down": {
          from: {
            height: 0,
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: 0,
          },
        },
        zoom: {
          "0%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(1.1)",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        rotate: "rotate 10s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        zoom: "zoom 2s ease-in-out infinite alternate",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

