export const content = ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"];
export const darkMode = "media";
export const theme = {
  screens: {
    sm: "640px",
    // 'md': '768px',
    md: "648px",
    lg: "1045px",
    xl: "1280px",
    "2xl": "1750px",
  },
  extend: {
    fontFamily: {
      title: ["Unna", "serif"],
      body: ["DM Sans", "sans-serif"],
      primarry: ["Inter", "sans-serif"],
    },
    colors: {
      emptyInput: "#F6F6F9", // empty input background
      writingGrey: "#9499A6", // writing color grey
      lightGrey: "#ebebeb", // pc navbar element hover color
      darkGrey: "#dddcdc", // pc navbar not selected element hover color
      main: "#FF385C", // the main color
      mainHover: "#D32F4F", // the main color hover
      darkBlue: "#30588C", // pc menu and languages button color
      writingMainDark: "#230306", // writing color dark blue
      greyBorder: "#E5E5E5", // grey border color
      creme: "#f8f8f8", // used in inbox list items
    },
    borderRadius: {
      10: "10px",
      20: "20px",
      30: "30px",
      40: "40px",
      50: "50%",
      60: "60px",
    },
    borderWidth: {
      1: "1px",
      2: "2px",
    },
    boxShadow: {
      hoverShadow: "0px 1px 4px rgba(0, 0, 0, 0.24)", // when hover shadow
      hardShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)", // used in the main pc and mobile search bar
      smallShadow: "2px 0px 4px rgba(0, 0, 0, 0.2)", // used in boat owner card
      smallHoverShadow: "4px -1px 4px rgba(0, 0, 0, 0.2)", // used in boat owner card hover
      bottomShadow: "0 5px 7px -5px rgba(0, 0, 0, 0.2)", // shadow only from bottom
      // leftShadow: "-20px 0 15px -3px rgba(0, 0, 0, 0.9)", // shadow only from left, used on pc filter sheet
    },
  },
};
export const variants = {
  extend: {},
};
export const plugins = [];

