import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../../Theme/Theme";

const TitleWithSeeMore = ({ title, handlePress }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: SIZES.padding + 4 }}>
      <Text style={styles.headerText}>{title}</Text>
      <TouchableOpacity onPress={handlePress}>
        <Text style={{ color: COLORS.primary, ...FONTS.body4 }}>See More  {'>>'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  headerText: {
    ...FONTS.body4,
    color: COLORS.black
  },
})

export default TitleWithSeeMore;