import React from 'react'
import { Text, View } from "react-native";
import globalStyles from "../../../Global/Styles";
import ScreenHeaderBarComponent from "../../../Component/ScreenHeaderBarComponent";

const UpdateScreen = () => {
  return (
    <View style={globalStyles.container}>
      <ScreenHeaderBarComponent headerText={'Update'} />
      <View style={globalStyles.subContainer}>
        <Text>Update Screen</Text>
      </View>
    </View>
  )
}

export default UpdateScreen;