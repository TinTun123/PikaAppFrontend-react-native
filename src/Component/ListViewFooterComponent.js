import React from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { COLORS, FONTS } from "../Theme/Theme";

const ListViewFooterComponent = props => {
  const end = props.end

  return (
    <View style={styles.container}>
      {
        end ? (
          <Text style={styles.text}>{'No More Data'}</Text>
        ) : (
          <ActivityIndicator size={25} color={COLORS.gray} />
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    ...FONTS.body4,
    color: COLORS.gray

  }
})

export default ListViewFooterComponent
