import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#3838A9",
  purple: "#525298",
  purpleLight: "#ffd6fd",

  black2: "#141318",

  orange: "#ff7f00",
  orange2: "#FFBF47",
  green: "#27AE60",
  lightGreen: "#ddf8f7",
  lightGreen2: "#41e5c9",

  red: "#EB0000",

  blue: "#0064C0",
  blue2: "#72c1f2",

  darkBlue3: "#1D3A70",
  darkBlue2: "#2C2C63",
  darkBlue: "#111A2C",
  darkGray: "#92908e",

  darkGray2: "#757D85", //border  gray

  gray: "#D5D5E1",

  gray2: "#7A7A7A", //gray font

  gray3: "#ebebeb",

  lightGray1: "#DDDDDD",
  lightGray2: "#F5F5F8",
  lightGray3: "#6B7280",
  white2: "#FBFBFB",
  white: "#FFFFFF",
  white3: "#F9FAFB",
  black: "#000000",
  black3: "#363636",

  transparentPrimray: "rgba(227, 120, 75, 0.4)",
  transparent: "transparent",
  transparentBlack1: "rgba(0, 0, 0, 0.1)",
  transparentBlack7: "rgba(0, 0, 0, 0.7)",
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  radius2: 14,
  padding: 32,
  marginHorizontal: { marginHorizontal: 28 },

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 18,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  largeTitle: { fontFamily: "Poppins_900Black", fontSize: SIZES.largeTitle },
  h1: { fontFamily: "Poppins_100Thin", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "Poppins_700Bold", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "Poppins_400Regular", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "Poppins_500Medium", fontSize: SIZES.h4, lineHeight: 22 },
  h5: { fontFamily: "Poppins_600SemiBold", fontSize: SIZES.h5, lineHeight: 22 },
  body1: {
    fontFamily: "Poppins_400Regular",
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: "Poppins_500Medium",
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: "Poppins_400Regular",
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: "Poppins_700Bold",
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: "Poppins_400Regular",
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
  body6: {
    fontFamily: "Poppins_300Light",
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

const appTheme = { COLORS, SIZES, FONTS, width, height };

export default appTheme;
