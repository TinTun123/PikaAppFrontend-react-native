import React from 'react'
import { Text, View } from "react-native";
import globalStyles from "../../Global/Styles";
import ScreenHeaderBarComponent from "../../Component/ScreenHeaderBarComponent";

const DownloadScreen = () => {
  return (
    <View style={globalStyles.container}>
      <ScreenHeaderBarComponent headerText={'Downloads'} />
      <View style={globalStyles.subContainer}>
        <Text>Download Screen</Text>
      </View>
    </View>
  )
}

export default DownloadScreen;