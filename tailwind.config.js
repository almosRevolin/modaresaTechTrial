/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        dark: "0px 2px 9px rgba(52, 43, 110, 0.3)",
      },
      width: {
        createModal: "64rem",
      },
      height: {
        createModal: "82rem",
      },
      maxHeight: {
        createModal: "80vh",
      },
    },
  },
  plugins: [],
};
