import React from 'react'
import { Text, View } from "react-native";
import globalStyles from "../../../Global/Styles";
import ScreenHeaderBarComponent from "../../../Component/ScreenHeaderBarComponent";


const PrivacyAndPolicyScreen = () => {
  return (
    <View style={globalStyles.container}>
      <ScreenHeaderBarComponent headerText={'Privacy & Policy'} />
      <View style={globalStyles.subContainer}>
        <Text>Privacy & Policy</Text>
      </View>
    </View>
  )
}

export default PrivacyAndPolicyScreen;