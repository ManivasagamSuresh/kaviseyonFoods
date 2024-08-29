// CommonJS module export
/** @type {import('tailwindcss').Config} */
const { Config } = require("tailwindcss");

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        themeColorDark: "#a5c667",
        themeColorLight: "#F7FFF4",
        textColor: "#212122",
        milkWhite: "#fff",
        lightGrey: "#808080",
      },
      typography: {
        DEFAULT: {
          css: {
            h1: { fontSize: "18px", fontWeight: "600" },
            h2: { fontSize: "18px", fontWeight: "600" },
            h3: { fontSize: "18px", fontWeight: "600" },
            h4: { fontSize: "18px", fontWeight: "600" },
            h5: { fontSize: "18px", fontWeight: "600" },
            h6: { fontSize: "18px", fontWeight: "600" },
            strong: { fontWeight: "600" },
            "h1 strong, h2 strong, h3 strong, h4 strong, h5 strong, h6 strong": {
              fontWeight: "600",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

module.exports = config;
