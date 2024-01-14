import React, { useContext, useEffect, useState } from "react";
import { Alert, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../Global/Styles";
import Carousel from "react-native-reanimated-carousel";
import { COLORS, FONTS, SIZES } from "../../Theme/Theme";
import ScreenHeaderBarComponent from "../../Component/ScreenHeaderBarComponent";
import TitleWithSeeMore from "../../Component/Home/TitleWithSeeMore";
import CourseCard from "../../Component/Course/CourseCard";
import { useQuery } from "react-query";
import { courseCategoryApi, getAllCoursesApi, popularCourseWithLimit, recommendedCourseWithLimit } from "../../api/api";
import axios from "axios";
import { AppContext } from "../../Provider/AppProvider";
import PopularCourseCard from "../../Component/Course/PopularCourseCard";
import SearchBarComponent from "../../Component/SearchBarComponent";



const CourseScreen = props => {

  const width = Dimensions.get('window').width;
  const { config } = useContext(AppContext);

  // const { data: popularData } = useQuery(popularCourseWithLimit, () => axios.get(popularCourseWithLimit, config));
  // const { data: categoryData } = useQuery(courseCategoryApi, () => axios.get(courseCategoryApi, config));

  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [end, setEnd] = useState(false);

  const handleEnd = () => {
    setPage(page + 1);
  };

  const onRefresh = () => {
    setEnd(false);
    setPage(1);
  };

  const fetchCourses = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`${getAllCoursesApi}?page=${page}`, config);
      console.log(response.data.courses.next_page_url);
      if (!response.data.courses.next_page_url) {
        setEnd(true);
      }
      if (page === 1) {
        setCourses([...response.data.courses.data]);
      } else {
        setCourses(pre => ([...pre, ...response.data.courses.data]));
      }
    } catch (e) {
      Alert.alert(e.message);
      console.log(e.response.data);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    if (!end) {
      fetchCourses();
    }
  }, [page]);



  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <ScreenHeaderBarComponent headerText={'Course'} />
      <View style={{ paddingHorizontal: SIZES.padding2, paddingBottom: SIZES.padding }}>
        <SearchBarComponent />
      </View>
      {/*<ScrollView showsVerticalScrollIndicator={false} style={globalStyles.container}>*/}
      <View style={{ ...globalStyles.subContainer, paddingBottom: SIZES.padding * 4 }}>
        <View>
          <View style={{ paddingBottom: 80 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              onEndReached={handleEnd}
              refreshing={refreshing}
              onRefresh={onRefresh}
              onEndReachedThreshold={0.2}
              data={courses} renderItem={({ item, index }) => {
                return (
                  <>
                    {
                      index === 4 ? (
                        <>
                          <PopularCourseCard />
                          <CourseCard key={item.id} item={item} />
                        </>
                      ) : (
                        <CourseCard key={item.id} item={item} />
                      )
                    }

                  </>
                )
              }} />

          </View>
        </View>
      </View>
      {/*</ScrollView>*/}
    </View>
  )
}

const styles = StyleSheet.create({
  headerText: {
    ...FONTS.body4,
    color: COLORS.black
  },
  carouselImage: {
    height: 230,
    resizeMode: "cover",
    borderRadius: SIZES.radius,
    width: '91%'
  },

})

export default CourseScreen
