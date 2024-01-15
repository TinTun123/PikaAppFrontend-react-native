import React, { useContext } from "react";
import { View, StyleSheet, Text, Image, FlatList, ScrollView, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../../Theme/Theme";
import { useQuery } from "react-query";
import { recommendedCourseWithLimit } from "../../api/api";
import axios from "axios";
import { AppContext } from "../../Provider/AppProvider";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import TitleWithSeeMore from "../Home/TitleWithSeeMore";
import { useNavigation } from "@react-navigation/native";

const PopularCourseCard = props => {
  const navigation = useNavigation();

  const { config } = useContext(AppContext);
  const { data: recommendedCourseData, isLoading } = useQuery(recommendedCourseWithLimit, () => axios.get(recommendedCourseWithLimit, config));


  return (
    <View style={styles.container}>

      <TitleWithSeeMore title={'Recommended for you'} handlePress={() => navigation.navigate('RecommendedCourseScreen')} />
      {
        isLoading ?
          <View style={{ flexDirection: 'row', gap: 10, paddingBottom: SIZES.padding }}>
            {
              [1, 2].map(item => (
                <SkeletonPlaceholder key={item} borderRadius={0} >
                  <SkeletonPlaceholder.Item width={200} flexDirection="row" alignItems="center">
                    <SkeletonPlaceholder.Item width={70} height={70} borderRadius={10} />
                    <SkeletonPlaceholder.Item marginLeft={20}>
                      <SkeletonPlaceholder.Item width={120} height={20} />
                      <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
                    </SkeletonPlaceholder.Item>
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
              ))
            }
          </View> : (
            <FlatList
              data={recommendedCourseData?.data?.courses}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => navigation.navigate("CourseDetailScreen", item.id)} style={styles.cardContainer}>
                  <Image style={styles.image} source={{
                    uri: item.image
                  }} />
                  <View style={styles.textContainer}>
                    <Text style={{ ...FONTS.body5, color: COLORS.black }}>{item.title}</Text>
                    <Text style={{ ...FONTS.body6, color: COLORS.darkgray }}>Module : {item.modules_count} Lesson : {item.videos_count}</Text>
                    <Text style={{ ...FONTS.body4, color: COLORS.primary }}>{(+item.price)?.toLocaleString('en-US')} MMK</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          )
      }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.padding2,
    marginBottom: SIZES.padding2 * 1.6,
  },
  cardContainer: {
    borderRadius: SIZES.radius,
    borderWidth: 0.5,
    borderColor: COLORS.primary,
    padding: SIZES.padding - 3,
    width: SIZES.width / 1.5,
    flexDirection: "row",
    marginEnd: SIZES.padding
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: SIZES.radius
  },
  textContainer: {
    marginStart: SIZES.padding,
    flex: 1,
    justifyContent: "space-between"
  }
});

export default PopularCourseCard;
