/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ["var(--font-sora)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        surface: "var(--surface)",
        accent: {
          DEFAULT: "#6366f1", // indigo-500
          hover: "#4f46e5", // indigo-600
        },
        hot: {
          DEFAULT: "#f59e0b", // amber-500
          light: "#fbbf24", // amber-400
        },
      },
    },
  },
  plugins: [],
};
