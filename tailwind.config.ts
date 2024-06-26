import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // themeGreen : "#4F7942",
        themeGreen : "#254E58",
        // lightThemeGreen:"#F7FFF4",
        lightThemeGreen:"#88BDBC",
        // greenShadow: "#F9FEF7",
        greenShadow: "#88BDBC",
        // bgLightGreen: "#F0FFF0",
        bgLightGreen: "#88BDBC",

      },
    },
  },
  plugins: [],
};
export default config;
