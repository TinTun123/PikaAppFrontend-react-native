import React from 'react'
import { Text, View } from "react-native";
import globalStyles from "../../Global/Styles";
import ScreenHeaderBarComponent from "../../Component/ScreenHeaderBarComponent";

const PaidCourseScreen = () => {
  return (
    <View style={globalStyles.container}>
      <ScreenHeaderBarComponent headerText={'Paid Course'} />
      <View style={globalStyles.subContainer}>
        <Text>Payment History screen</Text>
      </View>
    </View>
  )
}

export default PaidCourseScreen;