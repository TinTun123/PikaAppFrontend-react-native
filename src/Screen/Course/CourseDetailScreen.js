import React, { useContext, useEffect, useState } from "react";
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../Global/Styles";
import ScreenHeaderBarComponent from "../../Component/ScreenHeaderBarComponent";
import { COLORS, FONTS, SIZES } from "../../Theme/Theme";
import Carousel from "react-native-reanimated-carousel";
import Foundation from "react-native-vector-icons/Foundation";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from "react-query";
import { buyCourseApi, getCoursesApi, toggleCourseSaved } from "../../api/api";
import axios from "axios";
import { AppContext } from "../../Provider/AppProvider";
import { Vimeo } from "react-native-vimeo-iframe";
import { formatVideoDuration } from "../../Global/Methods";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";


const CourseDetailScreen = () => {
  const navigation = useNavigation();
  const width = Dimensions.get("window").width - 38;
  const { params: id } = useRoute();
  const { config } = useContext(AppContext);


  const {
    data,
    isLoading,
    isError,
    refetch: refetchCourse,
  } = useQuery(`${getCoursesApi}/${id}}`, () => axios.get(`${getCoursesApi}/${id}}`, config));

  const buyCourse = async () => {
    if (!isLoading) {
      try {
        let res = await axios.post(`${buyCourseApi}/${id}`, {}, config);
        refetchCourse();
      } catch (e) {
        Alert.alert("Error", e.message);
      }
    }
  };

  const toggleSaved = async () => {
    try {
      let res = await axios.post(`${toggleCourseSaved}/${id}`, {}, config);
      refetchCourse();
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  useEffect(() => {
    console.log(data?.data);

  }, [data])

  return (
    <>
      {
        !isLoading ?
          <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScreenHeaderBarComponent headerText={"Course Detail"} />
            <View style={{ flex: 1, padding: SIZES.padding2, width: '100%' }}>
              {
                data?.data?.hasAccess ?
                  <View style={styles.enrollBtnContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("CourseWatchingScreen", id)} style={{
                      width: '90%',
                      height: 45,
                      backgroundColor: COLORS.primary,
                      borderRadius: SIZES.roundRadius,
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                      <Text style={{ color: COLORS.white, ...FONTS.body4 }}>Watch Lesson</Text>
                    </TouchableOpacity>
                  </View>
                  :
                  <View style={[styles.enrollBtnContainer, { justifyContent: "space-between", flexDirection: "row", paddingHorizontal: SIZES.padding2 }]}>
                    <Text style={{ ...FONTS.body3, color: COLORS.dodgerBlue }}>{(+data?.data?.course?.fee)?.toLocaleString("en-US")} MMK</Text>
                    <TouchableOpacity onPress={buyCourse} style={{
                      width: '30%',
                      height: 45,
                      backgroundColor: COLORS.primary,
                      borderRadius: SIZES.roundRadius,
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                      <Text style={{ color: COLORS.white, ...FONTS.body4 }}>Enroll Now</Text>
                    </TouchableOpacity>
                  </View>
              }
              <View>
                <View>
                  <TouchableOpacity onPress={toggleSaved} style={styles.iconContainer}>
                    <FontAwesome size={17} name={data?.data?.course?.saved ? "heart" : "heart-o"}
                      color={data?.data?.course?.saved ? COLORS.primary : COLORS.darkgray} />
                  </TouchableOpacity>
                  <Image style={{ ...styles.courseImage, height: width / 1.7 }} source={{
                    uri: data?.data?.course?.image,
                  }} />
                </View>
                <View>
                  <Text style={styles.titleText}>{data?.data?.course?.title}</Text>
                  <View style={{ marginBottom: SIZES.padding2 }}>
                    <Text style={{ ...FONTS.body4, color: COLORS.black }}>Description</Text>
                    <Text style={{ ...FONTS.body6, color: COLORS.darkgray }}>{data?.data?.course?.description}asdfasdfajsdfjadksfjalksdfjakj
                      ksjadfklajsdfjaiosdjfia jiajs Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi eius
                      enim fugit hic ipsam nesciunt, nobis provident quae, quam sequi sit tempore. Eius eos ex quos
                      sapiente sequi velit, voluptatem?</Text>
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
                              item.type === "video" ?
                                <View style={{ height: width / 1.7 }}>
                                  <Vimeo
                                    style={{ flex: 1 }}
                                    videoId={item.file}
                                    params={"api=1&autoplay=0"}
                                  />
                                </View> :
                                <Image style={[styles.carouselImage, { height: width / 1.7 }]} source={{
                                  uri: item.file,
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
          </View>
          : null
      }

    </>

  );
};


const styles = StyleSheet.create({
  courseImage: {
    height: 230,
    resizeMode: "cover",
    borderRadius: SIZES.radius * 1.4,
    width: "100%",

  },
  instructorContainer: {
    backgroundColor: COLORS.subGray,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    flexDirection: "row",
    gap: SIZES.padding,
    alignItems: "center",
    marginBottom: SIZES.padding,
  },
  instructorProfile: {
    width: 50,
    height: 50,
    borderRadius: SIZES.roundRadius,
  },
  headerText: {
    ...FONTS.body4,
    color: COLORS.black,
  },
  carouselImage: {
    height: 230,
    resizeMode: "cover",
    borderRadius: SIZES.radius,
    width: "100%",
  },
  iconContainer: {
    position: "absolute",
    right: "4%",
    top: "4%",
    width: 30,
    height: 30,
    zIndex: 4000,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.roundRadius,
  },
  titleText: {
    ...FONTS.body3,
    color: COLORS.black,
    marginVertical: SIZES.padding,
  },
  enrollBtnContainer: {
    width: SIZES.width,
    height: 70,
    backgroundColor: COLORS.white,
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,

  },

});
export default CourseDetailScreen;
