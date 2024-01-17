import React, { useContext, useEffect, useState } from 'react'
import globalStyles from "../../Global/Styles";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import ScreenHeaderBarComponent from "../../Component/ScreenHeaderBarComponent";
import CourseCard from "../../Component/Course/CourseCard";
import { COLORS, FONTS, SIZES } from "../../Theme/Theme";
import { getSavedCourseApi } from "../../api/api";
import axios from "axios";
import { AppContext } from "../../Provider/AppProvider";
import FullScreenShadowLoading from "../../Component/FullScreenShadowLoading";

const SavedCourseScreen = (props) => {

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
      const res = await axios.get(`${getSavedCourseApi}?page=${page}`, config);
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
      <ScreenHeaderBarComponent headerText={'Saved Course'} />
      {
        isFetching && !refreshing ?
          <FullScreenShadowLoading />
          :
          <View style={{ ...globalStyles.subContainer, paddingBottom: 100 }}>
            <FlatList
              refreshing={refreshing}
              showsVerticalScrollIndicator={false}
              data={courses}
              onEndReached={handleEnd}
              onEndReachedThreshold={0.3}
              onRefresh={onRefresh}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <CourseCard key={item.id} item={item} />
              )}
            />

          </View>
      }

    </View>
  )
}

const styles = StyleSheet.create({

})
export default SavedCourseScreen;


