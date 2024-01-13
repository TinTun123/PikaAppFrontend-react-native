import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS, SIZES } from "../Theme/Theme";

const ScreenHeaderBarComponent = ({ headerText }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
        <FontAwesome color={COLORS.gray} size={25} name="angle-left" />
      </TouchableOpacity>
      <Text style={styles.headerText}>{headerText}</Text>
      <TouchableOpacity style={styles.hideButton}>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    widthL: '100%',
    paddingVertical: SIZES.padding,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: SIZES.padding,
  },
  button: {
    backgroundColor: COLORS.white,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.roundRadius,
    borderColor: COLORS.lightGray4,
    borderWidth: 1,
    // shadowColor: "rgba(0,0,0,0.7)",
    // shadowOffset: {
    //   width: 0,
    //   height: 9,
    // },
    // shadowOpacity: 0.48,
    // shadowRadius: 11.95,
    // elevation: 18,
  },
  headerText: {
    ...FONTS.body4,
    color: COLORS.black
  },
  hideButton: {
    width: 45,
    height: 45

  }

})

export default ScreenHeaderBarComponent