/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        blue: "#06B6D4",
        purple: "#AB7CDB",
        green: "#64C788",
        pink: "#EA7CB7",
        orange: "#E7A455",
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
          "base-100": "#1D232A",
          "base-300": "#15191E",
          primary: "#747FFF",
          accent: "#00CDB7",
          success: "#62EFBD",
          error: "#FF5861",
          warning: "#EAB308",
          secondary: "#9CA3AF",
        },
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          ".btn-ghost": {
            color: "#181A2A",
          },
          ".btn-primary": {
            color: "#FFFFFF",
          },
          ".input-bordered": {
            "border-color": "#181A2A",
          },
          "base-100": "#FFFFFF",
          "base-300": "#D1D1D1",
          primary: "#4D6EFF",
          accent: "#08A493",
          success: "#00AA6E",
          error: "#FF5861",
          warning: "#EAB308",
          "base-content": "181A2A",
          secondary: "#646464",
        },
      },
    ],
  },
};
