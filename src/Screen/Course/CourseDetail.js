import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../Global/Styles";
import ScreenHeaderBarComponent from "../../Component/ScreenHeaderBarComponent";
import { COLORS, FONTS, SIZES } from "../../Theme/Theme";
import Carousel from "react-native-reanimated-carousel";
import Foundation from 'react-native-vector-icons/Foundation';
import { useNavigation } from "@react-navigation/native";


const CourseDetail = () => {
  const navigation = useNavigation();
  const width = Dimensions.get('window').width - 40;
  const id = 1;

  return (
    <View style={globalStyles.container}>
      <ScreenHeaderBarComponent headerText={'Motivation'} />
      <View style={{ ...globalStyles.subContainer, position: 'relative' }}>
        <TouchableOpacity onPress={() => navigation.navigate('CourseWatchingScreen', id)} style={{ position: 'absolute', backgroundColor: COLORS.primary, paddingHorizontal: SIZES.padding * 2, paddingVertical: SIZES.padding, borderRadius: SIZES.roundRadius, zIndex: 10, flexDirection: 'row', gap: 5, bottom: 0, right: 20 }}>
          <Foundation name='dollar' color={COLORS.white} size={20} />
          <Text style={{ color: COLORS.white }}>Buy Now</Text>
        </TouchableOpacity>
        <View>
          <Image style={{ ...styles.courseImage, height: width / 1.7 }} source={require('../../Graphic/DummyImage/profile.png')} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: SIZES.padding }}>
            <View style={{ backgroundColor: COLORS.subGray, width: '48%', padding: SIZES.padding, borderRadius: SIZES.radius }}>
              <Text>Duration</Text>
              <Text style={{ ...FONTS.body3, color: COLORS.black }}>120,000 mmk</Text>
            </View>
            <View style={{ backgroundColor: COLORS.subGray, width: '48%', padding: SIZES.padding, borderRadius: SIZES.radius }}>
              <Text>Fee</Text>
              <Text style={{ ...FONTS.body3, color: COLORS.black }}>120,000 mmk</Text>
            </View>
          </View>
          <View style={styles.instructorContainer}>
            <Image style={styles.instructorProfile} source={require('../../Graphic/DummyImage/profile.png')} />
            <View>
              <Text style={{ ...FONTS.body4, color: COLORS.black }}>Ko Phyo Thiha  </Text>
              <Text style={{ ...FONTS.body4, color: COLORS.primary }}>Founder & CEO at Pika Sharing</Text>
            </View>
          </View>


          <View style={{ height: width / 1.5 }}>
            <Text style={styles.headerText}>Testimonials</Text>
            <Carousel
              style={{ marginTop: SIZES.padding }}
              loop
              width={width}
              data={[1, 2, 3]}
              scrollAnimationDuration={3000}
              // onSnapToItem={(index) => console.log('current index:', index)}
              renderItem={({ item, index }) => (
                <TouchableOpacity key={index} onPress={() => Linking.openURL(item.link)}>
                  <Image style={[styles.carouselImage, { height: width / 1.7 }]} source={require('../../Graphic/DummyImage/profile.png')} />
                </TouchableOpacity>
              )}
            />
          </View>

        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  courseImage: {
    height: 230,
    resizeMode: "cover",
    borderRadius: SIZES.radius,
    width: '100%'
  },
  instructorContainer: {
    backgroundColor: COLORS.subGray,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    gap: SIZES.padding,
    alignItems: 'center',
    marginBottom: SIZES.padding
  },
  instructorProfile: {
    width: 50,
    height: 50,
    borderRadius: SIZES.roundRadius
  },
  headerText: {
    ...FONTS.body4,
    color: COLORS.black,
  },
  carouselImage: {
    height: 230,
    resizeMode: "cover",
    borderRadius: SIZES.radius,
    width: '100%'
  },
})
export default CourseDetail;