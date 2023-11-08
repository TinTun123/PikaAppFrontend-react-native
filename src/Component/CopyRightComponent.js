import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { COLORS, FONTS } from "../Theme/Theme";

const CopyRightComponent = props => {
  return (
    <View style={styles.copyRightContainer}>

      <Text style={styles.text}>@2022 Powered by AccessCode</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    ...FONTS.body5,
    color: COLORS.primary,
    textAlign: "center",
    position: "absolute",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    bottom: "5%",
    zIndex: 1000,
  },
  copyRightContainer: {
    position: "absolute", // Set position to absolute
    bottom: 5, // Stick it to the bottom of the screen
    width: "100%",
    backgroundColor: COLORS.white,
  },

});

export default CopyRightComponent;
