import React, { useContext } from "react";
import { View, StyleSheet, Text, Image, FlatList, ScrollView, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../../Theme/Theme";
import { useQuery } from "react-query";
import { recommendedCourseWithLimit } from "../../api/api";
import axios from "axios";
import { AppContext } from "../../Provider/AppProvider";

const PopularCourseCard = props => {

  const { config } = useContext(AppContext);
  const { data: recommendedCourseData } = useQuery(recommendedCourseWithLimit, () => axios.get(recommendedCourseWithLimit, config));


  return (
    <View style={styles.container}>
      <Text style={{ ...FONTS.body4, color: COLORS.black, marginBottom: SIZES.padding }}>Recommended for you</Text>
      <FlatList
        data={recommendedCourseData?.data?.courses}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={styles.cardContainer}>
            <Image style={styles.image} source={{
              uri: item.image
            }} />
            <View style={styles.textContainer}>
              <Text style={{ ...FONTS.body5, color: COLORS.black }}>{item.title}</Text>
              <Text style={{ ...FONTS.body6, color: COLORS.darkgray }}>Module : {item.modules_count} Lesson : {item.videos_count}</Text>
              <Text style={{ ...FONTS.body4, color: COLORS.primary }}>{(+item.price)?.toLocaleString('en-US')} MMK</Text>
            </View>
          </View>
        )}
      />
      <ScrollView style={{ width: '100%' }} horizontal showsHorizontalScrollIndicator={false}>

      </ScrollView>

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
