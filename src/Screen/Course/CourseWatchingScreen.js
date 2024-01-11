import React from 'react'
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../Global/Styles";
import ScreenHeaderBarComponent from "../../Component/ScreenHeaderBarComponent";
import { useRoute } from "@react-navigation/native";
import { Vimeo } from "react-native-vimeo-iframe";
import { COLORS, SIZES } from "../../Theme/Theme";
import CollapsibleView from "../../Component/CollapsibleView";

const CourseWatchingScreen = () => {

  const route = useRoute();
  console.log(route.params);
  const width = Dimensions.get('window').width;

  return (
    <View style={globalStyles.container}>
      <ScreenHeaderBarComponent headerText={'Lesson'} />
      <View style={{ height: width / 1.75 }}>
        <Vimeo
          style={{ flex: 1 }}
          videoId="889851110"
          params={'api=1&autoplay=0'}
        />
      </View>
      <View style={{ ...globalStyles.subContainer }}>
        <Text style={{ fontSize: SIZES.h4, color: COLORS.black, fontWeight: 'bold', marginBottom: SIZES.padding - 5 }}>How to overcome your fear of getting rejection</Text>
        <Text style={{ fontSize: SIZES.body3, color: COLORS.gray }}>Description goes here.. Description goes here.. Description goes here...</Text>

        {
          [1, 2, 3, 4, 5].map(item => (
            <CollapsibleView trigger={
              <View style={{ paddingVertical: SIZES.padding, flexDirection: 'row' }}>
                <Text style={{ fontSize: SIZES.body3, color: COLORS.black }}>Module {item} |</Text>
                <Text style={{ fontSize: SIZES.body3, color: COLORS.black }}> Motivate yourself in 10 days</Text>
              </View>
            }>
              <Text>lorem lorem lorem lorem lorem ha aha hafs fsf  I am sai win oo how are you ? I am fine, how about you? are you fucking kidding me ? </Text>
            </CollapsibleView>
          ))
        }
      </View>

    </View>
  )
}

export default CourseWatchingScreen;