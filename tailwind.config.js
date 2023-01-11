/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.tsx"],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "600px",
        md: "730px",
        lg: "800px",
        xl: "900px",
      },
      padding: {
        DEFAULT: "1.5rem",
      },
    },
    extend: {
      backgroundColor: {
        overlay: "rgba(0,0,0,0.5)",
      },
      colors: {
        white: "#fff",
        black: "#000",
        purple: "#7c5dfa",
        heliotrope: "#9277ff",
        mirage: " #1e2139",
        ebony: "#252945",
        selago: "#dfe3fa",
        baliHai: "#888eb0",
        shipCove: "#7e88c3",
        vulcan: "#0c0e16",
        burntSienna: "#ec5757",
        monaLisa: "#ff9797",
        whisper: "#f8f8fb",
        offWhite: "#f9fafe",
        mirage2: "#141625",
        darkAccent: "#494e6e",
        orange: "#ff8f00",
        fadedOrange: "rgba(255, 143, 0, 0.0571)",
        otherDark: "#373b53",
        greenFaded: "rgb(51 214 159 / 6%)",
        greenColorStatusInvoice: "#33d69f",
        bgDraftStatusLight: "rgb(55 59 83 / 6%)",
        bgDraftStatusDark: "rgba(223,227,250,.0571)",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("tailwind-scrollbar-hide"),
  ],
};
