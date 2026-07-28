/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      maxWidth: {
        "7xl": "90rem", // 1440px
      },
      colors: {
        "bg-primary": "#F6FAFF",
        "bg-secondary": "#EAF2FF",
        "bg-card": "#101D38",
        "accent-blue": "#4D7CFF",
        "accent-cyan": "#38BDF8",
        "accent-violet": "#8B5CF6",
        "accent-teal": "#14B8A6",
        "accent-gold": "#F59E0B",
        "text-primary": "#0F172A",
        "text-secondary": "#A7B4D0",
        "border-subtle": "rgba(148,163,184,0.16)",
      },
      fontFamily: {
        heading: ['"Outfit"', "sans-serif"],
        body: ['"Inter"', "sans-serif"],
        mono: ['"Inter"', "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(56,189,248,0.18), 0 24px 60px rgba(77,124,255,0.18)",
        gold: "0 18px 40px rgba(245,158,11,0.24)",
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(circle at 20% 20%, rgba(77,124,255,0.24), transparent 26%), radial-gradient(circle at 80% 10%, rgba(56,189,248,0.18), transparent 24%), radial-gradient(circle at 70% 78%, rgba(139,92,246,0.18), transparent 24%), linear-gradient(180deg, #07111f 0%, #0d1730 52%, #08111d 100%)",
        "grid-fade":
          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -18px, 0)" },
        },
        pulseLine: {
          "0%, 100%": { opacity: "0.35", transform: "scaleX(0.96)" },
          "50%": { opacity: "1", transform: "scaleX(1)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(16px, -18px, 0) scale(1.04)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-line": "pulseLine 3s ease-in-out infinite",
        drift: "drift 16s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
