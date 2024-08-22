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
        pretendard: ['Pretendard'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "blue--100": "#DBE2FD",
        "blue--200": "#B7C6FB",
        "blue--300": "#93A9F9",
        "blue--400": "#6F8DF7",
        "blue--500": "#4B70F5",
        "gray--100": "#E8E9EB",
        "gray--200": "#D1D2D7",
        "gray--300": "#BABCC2",
        "gray--400": "#A3A5AE",
        "gray--500": "#8C8F9A",
        "red--100": "#FFD3D3",
        "red--200": "#FFA8A8",
        "red--300": "#FF7C7C",
        "red--400": "#FF5151",
        "red--500": "#FF2525",
        "yellow--100": "#FFF2CF",
        "yellow--200": "#FFE59F",
        "yellow--300": "#FFD96F",
        "yellow--400": "#FFCC3F",
        "yellow--500": "#FFBF0F",
        "green--100": "#D4F2E1",
        "green--200": "#A9E5C3",
        "green--300": "#7DD8A5",
        "green--400": "#52CB87",
        "green--500": "#27BE69",
      },
    },
  },
  plugins: [],
};
