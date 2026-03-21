import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#060914",
        panel: "#0D1224",
        line: "#1E2A4A",
        primary: "#64E4FF",
        secondary: "#7C83FF",
        accent: "#A3FFB4"
      },
      boxShadow: {
        neon: "0 0 0 1px rgba(100,228,255,.25), 0 10px 30px rgba(0,0,0,.35)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
