import React, { useContext, useState } from 'react'
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../Global/Styles";
import ScreenHeaderBarComponent from "../../Component/ScreenHeaderBarComponent";
import { COLORS, FONTS, SIZES } from "../../Theme/Theme";
import Carousel from "react-native-reanimated-carousel";
import Foundation from 'react-native-vector-icons/Foundation';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from "react-query";
import { buyCourseApi, getCoursesApi } from "../../api/api";
import axios from "axios";
import { AppContext } from "../../Provider/AppProvider";
import { Vimeo } from "react-native-vimeo-iframe";
import { formatVideoDuration } from "../../Global/Methods";


const CourseDetailScreen = () => {
  const navigation = useNavigation();
  const width = Dimensions.get('window').width - 38;
  const { params: id } = useRoute();
  const { config } = useContext(AppContext);


  const { data, isLoading, isError, refetch: refetchCourse } = useQuery(`${getCoursesApi}/${id}}`, () => axios.get(`${getCoursesApi}/${id}}`, config));

  const buyCourse = async () => {
    if (!isLoading) {
      try {
        let res = await axios.post(`${buyCourseApi}/${id}`, {}, config);
        refetchCourse();
      } catch (e) {
        Alert.alert('Error', e.message);
      }
    }
  }

  console.log(data?.data?.hasAccess);

  return (
    <>
      {
        !isLoading ?
          <ScrollView style={{ ...globalStyles.container, position: 'relative' }}>
            <ScreenHeaderBarComponent headerText={data?.data?.course?.title} />
            <View style={{ ...globalStyles.subContainer }}>
              {
                data?.data?.hasAccess ?
                  <TouchableOpacity onPress={() => navigation.navigate('CourseWatchingScreen', id)} style={{ position: 'absolute', backgroundColor: COLORS.primary, paddingHorizontal: SIZES.padding * 2, paddingVertical: SIZES.padding, borderRadius: SIZES.roundRadius, zIndex: 10, flexDirection: 'row', gap: 5, bottom: 0, right: 20 }}>
                    <Text style={{ color: COLORS.white }}>Watch Lesson</Text>
                  </TouchableOpacity> :
                  <TouchableOpacity onPress={buyCourse} style={{ position: 'absolute', backgroundColor: COLORS.primary, paddingHorizontal: SIZES.padding * 2, paddingVertical: SIZES.padding, borderRadius: SIZES.roundRadius, zIndex: 10, flexDirection: 'row', gap: 5, bottom: 0, right: 20 }}>
                    <Foundation name='dollar' color={COLORS.white} size={20} />
                    <Text style={{ color: COLORS.white }}>Buy Now</Text>
                  </TouchableOpacity>
              }
              <View>
                <Image style={{ ...styles.courseImage, height: width / 1.7 }} source={{
                  uri: data?.data?.course?.image
                }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: SIZES.padding }}>
                  <View style={{ backgroundColor: COLORS.subGray, width: '48%', padding: SIZES.padding, borderRadius: SIZES.radius }}>
                    <Text>Duration</Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.black }}>
                      {formatVideoDuration(data?.data?.course?.totalVideoLength, true)}
                    </Text>
                  </View>
                  <View style={{ backgroundColor: COLORS.subGray, width: '48%', padding: SIZES.padding, borderRadius: SIZES.radius }}>
                    <Text>Fee</Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.black }}>{(+data?.data?.course?.price)?.toLocaleString('en-US')} mmk</Text>
                  </View>
                </View>
                <View style={styles.instructorContainer}>
                  <Image style={styles.instructorProfile} source={require('../../Graphic/DummyImage/profile.png')} />
                  <View>
                    <Text style={{ ...FONTS.body4, color: COLORS.black }}>Ko Phyo Thiha  </Text>
                    <Text style={{ ...FONTS.body4, color: COLORS.primary }}>Founder & CEO at Pika Sharing</Text>
                  </View>
                </View>

                {
                  data?.data?.course?.testimonials ?
                    <View>
                      <Text style={styles.headerText}>Testimonials</Text>
                      <Carousel
                        style={{ height: width / 1.75, marginTop: SIZES.padding }}
                        loop
                        width={width}
                        data={data.data.course.testimonials}
                        scrollAnimationDuration={3000}
                        // onSnapToItem={(index) => console.log('current index:', index)}
                        renderItem={({ item }) => (
                          <>
                            {
                              item.type === 'video' ?
                                <View style={{ height: width / 1.7 }}>
                                  <Vimeo
                                    style={{ flex: 1 }}
                                    videoId={item.file}
                                    params={'api=1&autoplay=0'}
                                  />
                                </View> :
                                <Image style={[styles.carouselImage, { height: width / 1.7 }]} source={{
                                  uri: item.file
                                }} />
                            }
                          </>

                        )}
                      />
                    </View>
                    : null
                }
              </View>
            </View>
          </ScrollView >
          : null
      }

    </>

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
export default CourseDetailScreen;