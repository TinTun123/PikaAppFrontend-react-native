import React, { useContext, useEffect, useState } from 'react'
import { Alert, FlatList, View } from "react-native";
import globalStyles from "../../Global/Styles";
import ScreenHeaderBarComponent from "../../Component/ScreenHeaderBarComponent";
import { getCoursesApi, getRecommendedCourse } from "../../api/api";
import CourseCard from "../../Component/Course/CourseCard";
import ListViewFooterComponent from "../../Component/ListViewFooterComponent";
import { AppContext } from "../../Provider/AppProvider";
import axios from "axios";
import { SIZES } from "../../Theme/Theme";
import FullScreenShadowLoading from "../../Component/FullScreenShadowLoading";

const RecommendedCourseScreen = () => {

  const { config } = useContext(AppContext);
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [end, setEnd] = useState(false);
  const [refreshing, setRefreshing] = useState(false);


  const handleEnd = () => {
    console.log('hello ', page);
    setPage(page + 1);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setEnd(false);
    fetchCourses(1);
  }

  const fetchCourses = async () => {
    if (page === 1) {
      setIsFetching(true);
    }
    try {
      const res = await axios.get(`${getRecommendedCourse}&page=${page}`, config);
      if (!res.data.courses.next_page_url) {
        setEnd(true);
      }
      if (page === 1) {
        setCourses([...res.data.courses.data]);
      } else {
        setCourses(pre => ([...pre, ...res.data.courses.data]));
      }
    } catch (e) {
      Alert.alert('Error', e.message);
      console.log(e);
    }
    setRefreshing(false);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchCourses();
  }, [page]);



  return (
    <View style={globalStyles.container}>
      <ScreenHeaderBarComponent headerText={'Recommended Course'} />

      {
        isFetching && !refreshing ?
          <FullScreenShadowLoading /> :
          <View style={{ ...globalStyles.subContainer, paddingBottom: '15%' }}>
            <FlatList
              data={courses}
              showsVerticalScrollIndicator={false}
              onRefresh={onRefresh}
              refreshing={refreshing}
              onEndReached={handleEnd}
              onEndReachedThreshold={0.2}
              renderItem={({ item }) => (
                <CourseCard item={item} key={item.id} />
              )}
              ListFooterComponent={() => (
                <ListViewFooterComponent end={end} />
              )}
            />
          </View>
      }

    </View>
  )
}

export default RecommendedCourseScreen;