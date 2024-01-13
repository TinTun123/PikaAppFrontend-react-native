import React, { useContext } from "react";
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../Global/Styles";
import Carousel from "react-native-reanimated-carousel";
import { COLORS, FONTS, SIZES } from "../../Theme/Theme";
import ScreenHeaderBarComponent from "../../Component/ScreenHeaderBarComponent";
import TitleWithSeeMore from "../../Component/Home/TitleWithSeeMore";
import CourseCard from "../../Component/Course/CourseCard";
import { useQuery } from "react-query";
import { courseCategoryApi, popularCourseWithLimit, recommendedCourseWithLimit } from "../../api/api";
import axios from "axios";
import { AppContext } from "../../Provider/AppProvider";
import PopularCourseCard from "../../Component/Course/PopularCourseCard";
import SearchBarComponent from "../../Component/SearchBarComponent";



const CourseScreen = props => {

  const width = Dimensions.get('window').width;
  const { config } = useContext(AppContext);

  const { data: recommendedCourseData } = useQuery(recommendedCourseWithLimit, () => axios.get(recommendedCourseWithLimit, config));
  const { data: popularData } = useQuery(popularCourseWithLimit, () => axios.get(popularCourseWithLimit, config));
  const { data: categoryData } = useQuery(courseCategoryApi, () => axios.get(courseCategoryApi, config));


  const CategoryButton = ({ category }) => {
    return (
      <TouchableOpacity style={styles.categoryButton}>
        <Text style={{ ...FONTS.body5 }}>{category.name}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{backgroundColor:COLORS.white,flex:1}}>
      <ScreenHeaderBarComponent headerText={'Course'} />
      <View style={{paddingHorizontal:SIZES.padding2,paddingBottom:SIZES.padding}}>
        <SearchBarComponent/>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={globalStyles.container}>
        <View style={{ ...globalStyles.subContainer, paddingBottom: SIZES.padding * 4 }}>

          <View>
            <View >
              <View>
                <FlatList data={recommendedCourseData?.data?.courses} renderItem={({item,index})=>{
                  return(
                    <>
                      {
                        index===4 ? (
                          <>
                            <PopularCourseCard/>
                            <CourseCard key={item.id} item={item} />
                          </>
                        ):(
                          <CourseCard key={item.id} item={item} />
                        )
                      }

                    </>
                  )
                }}/>

              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
  categoryButton: {
    backgroundColor: COLORS.subGray,
    paddingVertical: SIZES.padding - 3,
    paddingHorizontal: SIZES.padding + 5,
    borderRadius: SIZES.roundRadius,
  }
})

export default CourseScreen
