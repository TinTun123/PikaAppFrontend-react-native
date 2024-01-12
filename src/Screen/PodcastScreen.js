import React, { useContext } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../Global/Styles";
import Carousel from "react-native-reanimated-carousel";
import { COLORS, FONTS, SIZES } from "../Theme/Theme";
import ScreenHeaderBarComponent from "../Component/ScreenHeaderBarComponent";
import TitleWithSeeMore from "../Component/Home/TitleWithSeeMore";
import PodcastCard from "../Component/PodcastCard";
import { useQuery } from "react-query";
import { courseCategoryApi, podcastCategoryApi, popularPodcastsWithLimit, recommendedPodcastsWithLimit } from "../api/api";
import axios from "axios";
import { AppContext } from "../Provider/AppProvider";


const PodcastScreen = props => {

  const width = Dimensions.get('window').width;
  const { config } = useContext(AppContext);
  const { data: podcastsData } = useQuery(recommendedPodcastsWithLimit, () => axios.get
    (recommendedPodcastsWithLimit, config));
  const { data: categoryData } = useQuery(podcastCategoryApi, () => axios.get(podcastCategoryApi, config));
  const { data: popularData } = useQuery(popularPodcastsWithLimit, () => axios.get(popularPodcastsWithLimit, config));



  const CategoryButton = ({ category }) => {
    return (
      <TouchableOpacity style={styles.categoryButton}>
        <Text style={{ ...FONTS.body5 }}>{category.name}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyles.container}>
      <ScreenHeaderBarComponent headerText={'Podcast'} />
      <View style={{ ...globalStyles.subContainer, paddingBottom: SIZES.padding * 4 }}>
        <View style={{ height: width / 1.5 }}>
          <Text style={styles.headerText}>Popular Podcast</Text>
          <Carousel
            style={{ marginTop: SIZES.padding }}
            loop
            width={width}
            autoPlay={true}
            data={popularData?.data?.podcasts}
            scrollAnimationDuration={1000}
            // onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={({ item }) => (
              <TouchableOpacity key={item.id}>
                <Image style={[styles.carouselImage, { height: width / 2 }]} source={{
                  uri: item.image
                }} />
              </TouchableOpacity>
            )}
          />
        </View>

        <View>
          <Text style={styles.headerText}>Categories</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginVertical: 5 }}>
            {
              categoryData?.data?.categories.map(item => (
                <CategoryButton key={item.id} category={item} />
              ))
            }
          </View>
          <View>
            <TitleWithSeeMore title={'Recommendation'} />
            <View style={{ gap: 15 }}>
              {
                podcastsData?.data?.podcasts.map(item => (
                  <PodcastCard key={item.id} item={item} />
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
