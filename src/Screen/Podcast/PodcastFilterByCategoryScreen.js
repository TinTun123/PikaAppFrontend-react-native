import React from 'react'
import { Text, View } from "react-native";
import globalStyles from "../../Global/Styles";

const PodcastFilterByCategoryScreen = () => {
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.subContainer}>
        <Text>Poddcast Filter by cateogry</Text>
      </View>
    </View>
  )
}

export default PodcastFilterByCategoryScreen;