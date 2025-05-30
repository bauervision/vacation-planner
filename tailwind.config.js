// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        bg: "var(--color-bg)",
      },
    },
  },
  safelist: [
    "bg-blue-900",
    "bg-red-900",
    "bg-neutral-900",
    // ...any other dynamic classes you might use!
  ],
  plugins: [],
};
