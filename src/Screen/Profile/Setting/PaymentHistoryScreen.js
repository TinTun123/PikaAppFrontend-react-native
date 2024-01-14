import React from 'react'
import { Text, View } from "react-native";
import globalStyles from "../../../Global/Styles";
import ScreenHeaderBarComponent from "../../../Component/ScreenHeaderBarComponent";

const PaymentHistoryScreen = () => {
  return (
    <View style={globalStyles.container}>
      <ScreenHeaderBarComponent headerText={'Payment History'} />
      <View style={globalStyles.subContainer}>
        <Text>Payment History screen</Text>
      </View>
    </View>
  )
}

export default PaymentHistoryScreen;