import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../Provider/AppProvider";
import { COLORS, FONTS, SIZES } from "../Theme/Theme";

const ScreenHeaderBarComponent = ({ headerText }) => {
  const navigation = useNavigation()
  const { t } = useContext(AppContext);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
        <FontAwesome color={COLORS.gray} size={25} name="angle-left" />
      </TouchableOpacity>
      <Text style={styles.headerText}>{t(headerText)}</Text>
      <TouchableOpacity style={styles.hideButton}>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: '100%',
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
