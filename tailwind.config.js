/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        98: "0.98"
      },
      fontFamily: {
        eduSABeginner: "EduSABeginner"
      },
      fontSize: {
        "2xs": "0.5rem"
      },
      colors: {
        red: {
          default: "#ff4343"
        },
        white: {
          default: "#ffffff",
          medium: "#f3f3f3"
        },
        blue: {
          light: {
            default: "#61c0bf"
          }
        },
        pink: {
          default: "#ffb6ff"
        },
        yellow: {
          default: "yellow"
        },
        twitch: "#6441a5"
      },
      width: {
        30: "30%",
        100: "400px",
      },
      height: {
        "5percent": "5%",
        100: "400px"
      }
    },
  },
  plugins: [],
}

