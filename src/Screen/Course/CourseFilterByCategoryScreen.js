import React, { useContext, useEffect, useState } from 'react'
import { Alert, FlatList, Text, View } from "react-native";
import globalStyles from "../../Global/Styles";
import axios from "axios";
import { getCoursesApi } from "../../api/api";
import { AppContext } from "../../Provider/AppProvider";
import ScreenHeaderBarComponent from "../../Component/ScreenHeaderBarComponent";
import CourseCard from "../../Component/Course/CourseCard";
import { SIZES } from "../../Theme/Theme";

const CourseFilterByCategoryScreen = props => {

  const id = props.route.params.id;
  const [page, setPage] = useState(1);
  const { config } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [end, setEnd] = useState(false);
  const [refreshing, setRefreshing] = useState(false);


  const fetchCourses = async (inputPage = null) => {
    setLoading(true);
    try {
      let res = await axios.get(`${getCoursesApi}?category_id=${id}&page=${inputPage ?? page}`, config);
      if (!res.data.courses.next_page_url) {
        setEnd(true);
      }
      if (res.data.courses.current_page === 1) {
        setCourses(res.data.courses.data);
      } else {
        setCourses(pre => ([...pre, ...res.data.courses.data]));
      }
    } catch (e) {
      Alert.alert(e.message);
      console.log(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setEnd(false);
    fetchCourses(1);
  }

  useEffect(() => {
    if (!refreshing) {
      fetchCourses();
    }
  }, [page])

  const handleEnd = () => {
    console.log('hello end');
    if (!end) {
      setPage(page + 1);
    }
  }


  return (
    <View style={globalStyles.container}>
      <ScreenHeaderBarComponent headerText={'Courses'} />
      <View style={{ ...globalStyles.subContainer, paddingBottom: 100 }}>
        {
          !loading && courses.length === 0 &&
          <View>
            <Text>No course</Text>
          </View>
        }
        <FlatList
          showsVerticalScrollIndicator={false}
          data={courses}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReached={handleEnd}
          onEndReachedThreshold={0.4}
          renderItem={({ item }) => (
            <CourseCard item={item} />
          )}
        />
      </View>
    </View>
  )
}

export default CourseFilterByCategoryScreen;