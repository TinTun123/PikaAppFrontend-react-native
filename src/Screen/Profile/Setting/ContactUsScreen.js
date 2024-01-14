import React from 'react'
import { Text, View } from "react-native";
import globalStyles from "../../../Global/Styles";
import ScreenHeaderBarComponent from "../../../Component/ScreenHeaderBarComponent";

const ContactUsScreen = () => {
  return (
    <View style={globalStyles.container}>
      <ScreenHeaderBarComponent headerText={'Contact us'} />
      <View style={globalStyles.subContainer}>
        <Text>Contact us</Text>
      </View>
    </View>
  )
}

export default ContactUsScreen;