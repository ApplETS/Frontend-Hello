/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "base-content": "DCDCDC",
          ".btn-primary": {
            color: "#DCDCDC",
          },
          ".btn-ghost": {
            color: "#DCDCDC",
          },
        },
        corporate: {
          ...require("daisyui/src/theming/themes")["corporate"],
          ".btn-ghost": {
            color: "#181A2A",
          },
        },
      },
    ],
  },
};
