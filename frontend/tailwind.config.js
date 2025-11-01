/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0056B3",
        accent: "#007AFF",
        page: "#F8F9FA",
        text: "#333333",
      },
      boxShadow: {
        soft: "0 6px 18px rgba(16,24,40,0.06)",
        card: "0 8px 30px rgba(16,24,40,0.08)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
