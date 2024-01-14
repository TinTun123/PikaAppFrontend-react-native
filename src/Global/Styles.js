import { COLORS, SIZES } from "../Theme/Theme";

const { StyleSheet } = require("react-native");

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.padding2,
  },
  subContainer: {
    paddingHorizontal: SIZES.padding2 * 1.5,
    paddingTop: SIZES.padding2,
  },
})

export default globalStyles;
