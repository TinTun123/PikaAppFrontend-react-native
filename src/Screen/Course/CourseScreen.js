import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../Global/Styles";
import Carousel from "react-native-reanimated-carousel";
import { COLORS, FONTS, SIZES } from "../../Theme/Theme";
import ScreenHeaderBarComponent from "../../Component/ScreenHeaderBarComponent";
import TitleWithSeeMore from "../../Component/Home/TitleWithSeeMore";
import CourseCard from "../../Component/Course/CourseCard";

const categories = ['Motivation', 'Business', 'Self-Growth', 'Youth', 'Speed', 'Life-Style', 'Money', 'Life', 'See More'];

const PodcastScreen = props => {

  const width = Dimensions.get('window').width;

  const CategoryButton = ({ category }) => {
    return (
      <TouchableOpacity style={styles.categoryButton}>
        <Text style={{ ...FONTS.body5 }}>{category}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyles.container}>
      <ScreenHeaderBarComponent headerText={'Course'} />
      <View style={{ ...globalStyles.subContainer, paddingBottom: SIZES.padding * 4 }}>
        <View style={{ height: width / 1.5 }}>
          <Text style={styles.headerText}>Popular Course</Text>
          <Carousel
            style={{ marginTop: SIZES.padding }}
            loop
            width={width}
            autoPlay={true}
            data={[...new Array(6).keys()]}
            scrollAnimationDuration={1000}
            // onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={({ index }) => (
              <Image style={[styles.carouselImage, { height: width / 2 }]} source={require("../../Graphic/DummyImage/profile.png")} />
            )}
          />
        </View>

        <View>
          <Text style={styles.headerText}>Categories</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginVertical: 5 }}>
            {
              categories.map(item => (
                <CategoryButton key={item} category={item} />
              ))
            }
          </View>
          <View>
            <TitleWithSeeMore title={'Recommendation'} />
            <View style={{ gap: 13 }}>
              {
                [...new Array(3).keys()].map(item => (
                  <CourseCard key={item} item={item} />
                ))
              }
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
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

export default PodcastScreen
