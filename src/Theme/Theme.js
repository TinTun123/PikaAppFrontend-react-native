import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    // primary: "#ffb606",
    // secondary: "#38c5f4",
    primary: "#F24405",
    // secondary: "#15081f",
    primaryBorder:"rgba(242,68,5,0.72)",
    secondary:"rgba(242,68,5,0.2)",
    whiteSecondary:"#f5f5f5",
    info:"#B2DCF9",
    secondInfo:"#66c2fd",
    black: "#000000",
    white: "#FFFFFF",
    gray : "#424242",
    subGray:"#F3F3F3",
    lightGray: "#F5F5F6",
    lightGray2: "rgba(217,217,217,0.42)",
    lightGray3: "#EFEFF1",
    lightGray4: "#ddddde",
    transparent: "rgba(0,0,0,0.34)",
    water: "rgba(0,0,0,0)",
    darkgray: '#898C95',
    danger : 'red',
    success : "#02ce11",
    dodgerBlue: "dodgerblue",
    lightRed:"rgba(255,0,0,0.11)"
};

export const SIZES = {
    base: 8,
    font: 14,
    radius: 5,
    roundRadius:30,
    padding: 10,
    padding2: 12,
    largeTitle: 50,
    h1: 30,
    h2: 25,
    h3: 20,
    h4: 18,
    h5: 16,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,
    body6: 10.9,//Transport Navigation Header
    body7: 8,
    width,
    height
};

export const FONTS = {
    largeTitle: { fontFamily: "Poppins-Bold", fontSize: SIZES.largeTitle},
    h1: { fontFamily: "Poppins-Bold", fontSize: SIZES.h1 },
    h2: { fontFamily: "Poppins-Bold", fontSize: SIZES.h2 },
    h3: { fontFamily: "Poppins-Bold", fontSize: SIZES.h3 },
    h4: { fontFamily: "Poppins-Bold", fontSize: SIZES.h4 },
    h5: { fontFamily: "Poppins-SemiBold", fontSize: SIZES.h5},
    body1: { fontFamily: "Poppins-Medium", fontSize: SIZES.body1 },
    body2: { fontFamily: "Poppins-Medium", fontSize: SIZES.body2 },
    body3: { fontFamily: "Poppins-Medium", fontSize: SIZES.body3 },
    body4: { fontFamily: "Poppins-Medium", fontSize: SIZES.body4 },
    body5: { fontFamily: "Poppins-Medium", fontSize: SIZES.body5 },
    body6: { fontFamily: "Poppins-Medium", fontSize: SIZES.body6 },
    body7: { fontFamily: "Poppins-Medium", fontSize: SIZES.body7 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
