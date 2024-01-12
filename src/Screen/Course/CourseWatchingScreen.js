import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../Global/Styles";
import ScreenHeaderBarComponent from "../../Component/ScreenHeaderBarComponent";
import { useRoute } from "@react-navigation/native";
import { Vimeo } from "react-native-vimeo-iframe";
import { COLORS, SIZES } from "../../Theme/Theme";
import CollapsibleView from "../../Component/CollapsibleView";
import { useQuery } from "react-query";
import { getCoursesApi, getLessonApi } from "../../api/api";
import { AppContext } from "../../Provider/AppProvider";
import axios from "axios";

const CourseWatchingScreen = () => {

  const { params: id } = useRoute();
  const width = Dimensions.get('window').width;
  const { config } = useContext(AppContext);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentLessonId, setCurrentLessonId] = useState(null);

  const { data: courseData, isLoading: courseLoading, isError } = useQuery(`${getCoursesApi}/${id}}`, () => axios.get(`${getCoursesApi}/${id}}`, config));

  const { isLoading: lessonLoading, refetch } = useQuery(`${getLessonApi}/${currentLessonId}`, () => axios.get(`${getLessonApi}/${currentLessonId}`, config), {
    enabled: !!(currentLessonId),
    onSuccess: (data) => {
      setCurrentLesson(data.data.lesson);
    }
  });


  useEffect(() => {
    if (!courseLoading) {
      setCurrentLessonId(courseData?.data?.course?.modules?.[0]?.videos?.[0]?.id);
    }
  }, [courseLoading]);

  useEffect(() => {
    console.log('currentLessonid ', currentLessonId)
    if (currentLessonId) {
      refetch();
    }
  }, [currentLessonId]);


  return (
    <>
      {
        courseLoading ?
          null :
          <View style={globalStyles.container}>
            <ScreenHeaderBarComponent headerText={'Lesson'} />
            {
              !lessonLoading ?
                <View style={{ height: width / 1.75 }}>
                  <Vimeo
                    style={{ flex: 1 }}
                    videoId={currentLesson?.video}
                    params={'api=1&autoplay=0'}
                  />
                </View>
                : <View style={{ height: width / 1.75, justifyContent: 'center', alignItems: 'center', }}>
                  <ActivityIndicator size={30} />
                </View>
            }
            <ScrollView style={{ ...globalStyles.subContainer }}>
              <Text style={{ fontSize: SIZES.h4, color: COLORS.black, fontWeight: 'bold', marginBottom: SIZES.padding - 5 }}>{currentLesson?.title}</Text>
              <Text style={{ fontSize: SIZES.body3, color: COLORS.gray }}>
                {currentLesson?.description}
              </Text>
              {
                courseData?.data?.course?.modules.map(item => (
                  <CollapsibleView key={item.id} trigger={
                    <View style={{ paddingVertical: SIZES.padding, flexDirection: 'row' }}>
                      <Text style={{ fontSize: SIZES.body3, color: COLORS.black, fontWeight: 'bold' }}>Module {item.id} | </Text>
                      <Text style={{ fontSize: SIZES.body3, color: COLORS.black, fontWeight: 'bold' }}>
                        {item.title}
                      </Text>
                    </View>
                  }>
                    {
                      item?.videos?.map(video => (
                        <TouchableOpacity key={video.id} onPress={() => setCurrentLessonId(video.id)} style={{ backgroundColor: currentLesson?.id === video.id ? COLORS.primary : COLORS.subGray, padding: SIZES.padding, marginBottom: SIZES.padding - 5, marginLeft: SIZES.padding, borderRadius: SIZES.radius }}>
                          <Text style={{ color: currentLesson?.id === video.id ? COLORS.white : COLORS.black }}>{video.number} | {video.title}</Text>
                        </TouchableOpacity>
                      ))
                    }
                  </CollapsibleView>
                ))
              }
            </ScrollView>

          </View>
      }
    </>
  )
}

export default CourseWatchingScreen;