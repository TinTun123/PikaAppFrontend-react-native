import React, { useContext } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../Theme/Theme";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../Provider/AppProvider";

const SearchBarComponent = props => {
  const navigation = useNavigation();
  const { t } = useContext(AppContext);

  return (
    <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")} style={styles.searchBar}>
      <Text style={{ ...FONTS.body4, color: COLORS.darkgray }}>{t(props.text)}</Text>
      <Feather name="search" size={20} color={COLORS.darkgray} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  searchBar: {
    width: '100%',
    backgroundColor: COLORS.lightGray2,
    height: 45,
    borderRadius: SIZES.roundRadius,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SIZES.padding2 * 2,
    justifyContent: "space-between"

  },
})

export default SearchBarComponent
