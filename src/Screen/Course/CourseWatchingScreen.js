import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import globalStyles from "../../Global/Styles";
import ScreenHeaderBarComponent from "../../Component/ScreenHeaderBarComponent";
import { useRoute } from "@react-navigation/native";
import { Vimeo } from "react-native-vimeo-iframe";
import { COLORS, FONTS, SIZES } from "../../Theme/Theme";
import CollapsibleView from "../../Component/CollapsibleView";
import { useQuery } from "react-query";
import { getCoursesApi, getLessonApi, toggleLessonWatchedApi } from "../../api/api";
import { AppContext } from "../../Provider/AppProvider";
import axios from "axios";
import { formatVideoDuration } from "../../Global/Methods";
import AntDesign from "react-native-vector-icons/AntDesign";


const CourseWatchingScreen = () => {

  const { params: id } = useRoute();
  const width = Dimensions.get("window").width;
  const { config } = useContext(AppContext);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentLessonId, setCurrentLessonId] = useState(null);

  const {
    data: courseData,
    isLoading: courseLoading,
    isError,
    refetch: refetchCourse,
  } = useQuery(`${getCoursesApi}/${id}}`, () => axios.get(`${getCoursesApi}/${id}}`, config));

  const {
    isLoading: lessonLoading,
    refetch: refetchLesson,
  } = useQuery(`${getLessonApi}/${currentLessonId}`, () => axios.get(`${getLessonApi}/${currentLessonId}`, config), {
    enabled: !!(currentLessonId),
    onSuccess: (data) => {
      setCurrentLesson(data.data.lesson);
    },
  });

  useEffect(() => {
    if (!courseLoading) {
      setCurrentLessonId(courseData?.data?.course?.modules?.[0]?.lessons?.[0]?.id);
    }
  }, [courseLoading]);

  useEffect(() => {
    if (currentLessonId) {
      refetchLesson();
    }
  }, [currentLessonId]);

  const markAsWatched = (lessonId) => {
    try {
      let res = axios.post(`${toggleLessonWatchedApi}/${lessonId}`, {}, config);
      refetchCourse();
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  const durationArray = ['01:30:00', '00:45:30', '02:15:15'];

  // Function to convert duration strings to seconds
  const convertToSeconds = (duration) => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  // Function to sum the durations in seconds
  const sumDurations = (durations) => {
    return durations.reduce((totalSeconds, duration) => {
      return totalSeconds + convertToSeconds(duration);
    }, 0);
  };

  // Sum the durations
  const totalSeconds = sumDurations(durationArray);

  // Function to convert total seconds to hours, minutes, and seconds
  const formatSecondsToDuration = (seconds) => {
    const hh = Math.floor(seconds / 3600);
    const mm = Math.floor((seconds % 3600) / 60);
    const ss = seconds % 60;

    return `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
  };

  // Format the total seconds back to a duration string
  const totalDuration = formatSecondsToDuration(totalSeconds);

  const videoCallbacks = {
    timeupdate: (data) => console.log('timeupdate: ', data),
    play: (data) => console.log('play: ', data),
    pause: (data) => console.log('pause: ', data),
    fullscreenchange: (data) => console.log('fullscreenchange: ', data),
    ended: (data) => console.log('ended: ', data),
  };
  return (
    <>
      {
        courseLoading ?
          null :
          <View style={globalStyles.container}>
            <ScreenHeaderBarComponent headerText={"Lesson"} />
            {
              !lessonLoading ?
                <View style={{ height: width / 1.75 }}>
                  <Vimeo
                    style={{ flex: 1 }}
                    videoId={currentLesson?.file}
                    params={"api=1&autoplay=0"}
                  />
                </View>
                : <View style={{ height: width / 1.75, justifyContent: "center", alignItems: "center" }}>
                  <ActivityIndicator color={COLORS.primary} size={50} />
                </View>
            }
            <ScrollView style={{ ...globalStyles.subContainer }}>
              <Text style={{
                ...FONTS.body3,
                color: COLORS.black,
                marginBottom: SIZES.padding - 5,
              }}>{currentLesson?.title}</Text>
              <Text style={{ ...FONTS.body4, color: COLORS.gray, marginBottom: SIZES.padding2 }}>
                {currentLesson?.description}
              </Text>
              {
                courseData?.data?.course?.modules.map(item => (

                  <View style={{ borderWidth: 1.4, borderColor: COLORS.lightGray4, borderRadius: SIZES.radius * 3, marginBottom: SIZES.padding2, paddingHorizontal: SIZES.padding2 * 1.3 }}>
                    <CollapsibleView key={item.id} trigger={
                      <View style={{ paddingVertical: SIZES.padding }}>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={{ ...FONTS.body4, color: COLORS.black }}>Module {item.id} | </Text>
                          <Text style={{ ...FONTS.body3, color: COLORS.black }}>
                            {item.title}
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                          <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>{item?.lessons?.length} Videos</Text>
                          <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}> {totalDuration}</Text>

                        </View>
                      </View>
                    }>
                      {
                        item?.lessons?.map(video => (
                          <TouchableOpacity
                            key={video.id}
                            onPress={() => setCurrentLessonId(video.id)}
                            style={{ ...styles.lessonButton, backgroundColor: "#f9f9f9" }}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
                              <TouchableOpacity onPress={() => markAsWatched(video.id)}>
                                {
                                  video.watched ?
                                    <AntDesign name="checkcircle" size={27} color={COLORS.primary} />
                                    :
                                    <AntDesign name="checkcircleo" size={27}
                                      color={currentLesson?.id === video.id ? COLORS.primary : COLORS.black} />

                                }
                              </TouchableOpacity>
                              <Text
                                style={{ color: currentLesson?.id === video.id ? COLORS.primary : COLORS.black, ...FONTS.body5 }}>
                                {video.title}</Text>
                            </View>
                            <Text
                              style={{ color: currentLesson?.id === video.id ? COLORS.primary : COLORS.black, ...FONTS.body4 }}>{formatVideoDuration(video.duration)}</Text>
                          </TouchableOpacity>
                        ))
                      }
                    </CollapsibleView>
                  </View>

                ))
              }
            </ScrollView>
          </View>
      }
    </>
  );
};


const styles = StyleSheet.create({
  lessonButton: {
    padding: SIZES.padding, marginBottom: SIZES.padding - 5,
    borderRadius: SIZES.radius * 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default CourseWatchingScreen;
