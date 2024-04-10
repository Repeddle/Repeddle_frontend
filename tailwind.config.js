/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {

     extend: {
       fontFamily: {
         'sans': ['Absentiasans', 'sans-serif'],
       },
     
      colors: {
        "malon-color": "#8a1719",
        "orange-color": "#eb9f40",
        "black-color": "black",
        "white-color": "white",
        "green-color": "#00c028",
        "red-color": "#d50000",
        "yellow-color": "yellow",
        "border-color": "rgba(99, 91, 91, 0.4)",
        "dark-ev1": "#121212",
        "dark-ev2": "#2c2824",
        "dark-ev3": "#231d16",
        "dark-ev4": "#2a2117",
        "light-ev1": "#f3f3f3",
        "light-ev2": "#ececec",
        "light-ev3": "#e5e5e5",
        "light-ev4": "#dedede",
      },
    },
  },
  darkMode: "class",
  plugins: [],

 };
