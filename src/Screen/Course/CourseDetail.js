import React from 'react'
import { Text, View } from "react-native";
import globalStyles from "../../Global/Styles";
import ScreenHeaderBarComponent from "../../Component/ScreenHeaderBarComponent";

const CourseDetail = () => {


  return (
    <View style={globalStyles.container}>
      <ScreenHeaderBarComponent headerText={'Motivation'} />
      <View style={globalStyles.subContainer}>

        <Text>hello world</Text>
      </View>
    </View>
  )
}

export default CourseDetail;