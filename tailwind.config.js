/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#F4F7FB",
          100: "#E5ECF5",
          200: "#C8D5E6",
          300: "#9DB3CF",
          400: "#6B86AE",
          500: "#4A6692",
          600: "#324A75",
          700: "#1F3458",
          800: "#13213B",
          900: "#0A1530",
          950: "#04091B",
        },
        brand: {
          50: "#ECFEFF",
          100: "#CFFAFE",
          200: "#A5F3FC",
          300: "#67E8F9",
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
          700: "#0E7490",
          800: "#155E75",
          900: "#164E63",
        },
        coral: {
          50: "#FFF1EE",
          100: "#FFE2DC",
          200: "#FFC4B8",
          300: "#FFA08D",
          400: "#FF7C61",
          500: "#FB5A3C",
          600: "#E33E20",
          700: "#B7311A",
          800: "#8E2614",
          900: "#6F1E10",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        display: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        serif: ['"Fraunces"', "Georgia", "serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-22px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(20px,-30px) scale(1.05)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.85" },
          "50%": { opacity: "0.4" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "ping-soft": {
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 12s ease-in-out infinite",
        "fade-up": "fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in": "fade-in 1s ease-out forwards",
        "pulse-soft": "pulse-soft 3.5s ease-in-out infinite",
        "spin-slow": "spin-slow 30s linear infinite",
        marquee: "marquee 35s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "ping-soft": "ping-soft 2.5s cubic-bezier(0,0,0.2,1) infinite",
        "gradient-x": "gradient-x 8s ease infinite",
      },
      backgroundImage: {
        "grid-light":
          "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
        "grid-dark":
          "linear-gradient(to right, rgba(10,21,48,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,21,48,0.06) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse at top, rgba(34,211,238,0.18), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(34,211,238,0.25), 0 20px 60px -15px rgba(34,211,238,0.45)",
        "soft-lg": "0 30px 80px -25px rgba(10, 21, 48, 0.25)",
        "ring-brand": "0 0 0 6px rgba(34,211,238,0.18)",
      },
    },
  },
  plugins: [],
};
