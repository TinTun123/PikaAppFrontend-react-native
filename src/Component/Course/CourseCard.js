import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../../Theme/Theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";


const CourseCard = ({ item }) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("CourseDetailScreen", item.id)} style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: SIZES.padding2,
    }}>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Image style={{ width: 80, height: 80, borderRadius: SIZES.radius }} source={{
          uri: item.image,
        }} />
        <View style={{ justifyContent: "space-between", width: "100%" }}>
          <Text style={{ ...FONTS.body4, color: COLORS.black }}>{item.title}</Text>
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <Text style={styles.module}>Modules : {item.modules_count} Lessons : {item.lessons_count}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
              <Text style={styles.tagStyle}>{(+item.fee).toLocaleString("en-US")} mmk</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tagStyle: {
    ...FONTS.body6,
    color: COLORS.black,
  },
  smallProfile: {
    width: 30,
    height: 30,
    borderRadius: SIZES.roundRadius,
  },
  detailButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding - 2,
    height: 30,
    borderRadius: SIZES.roundRadius,
    justifyContent: "center",
  },
  detailText: {
    color: COLORS.white,
    ...FONTS.body6,
  },
  module: {
    ...FONTS.body6,
    color: COLORS.black,
  },
});
export default CourseCard;
