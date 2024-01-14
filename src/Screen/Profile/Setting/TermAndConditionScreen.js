import React from 'react'
import { Text, View } from "react-native";
import globalStyles from "../../../Global/Styles";
import ScreenHeaderBarComponent from "../../../Component/ScreenHeaderBarComponent";

const TermAndConditionScreen = () => {
  return (
    <View style={globalStyles.container}>
      <ScreenHeaderBarComponent headerText={'Term & Condition'} />
      <View style={globalStyles.subContainer}>
        <Text>Term And Condition </Text>
      </View>
    </View>
  )
}

export default TermAndConditionScreen;