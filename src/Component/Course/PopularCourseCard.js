import React from "react";
import { View, StyleSheet, Text, Image, FlatList, ScrollView, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../../Theme/Theme";

const PopularCourseCard = props => {
  return (
    <View style={styles.container}>
      <Text style={{ ...FONTS.body4, color: COLORS.black , marginBottom:SIZES.padding }}>Recommended for you</Text>
      {/*convert to flatlist*/}
      <ScrollView style={{width:'100%'}} horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          <Image style={styles.image} source={require("../../Graphic/DummyImage/profile.png")}/>
          <View style={styles.textContainer}>
            <Text style={{...FONTS.body5,color:COLORS.black}}>Hello Hello Hello</Text>
            <Text style={{...FONTS.body6,color:COLORS.darkgray}}>Module : 3 Lesson : 0</Text>
            <Text style={{...FONTS.body4,color:COLORS.primary}}>500000MMK</Text>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <Image style={styles.image} source={require("../../Graphic/DummyImage/profile.png")}/>
          <View style={styles.textContainer}>
            <Text style={{...FONTS.body5,color:COLORS.black}}>Hello Hello Hello</Text>
            <Text style={{...FONTS.body6,color:COLORS.darkgray}}>Module : 3 Lesson : 0</Text>
            <Text style={{...FONTS.body4,color:COLORS.primary}}>500000MMK</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.cardContainer}>
          <Image style={styles.image} source={require("../../Graphic/DummyImage/profile.png")}/>
          <View style={styles.textContainer}>
            <Text style={{...FONTS.body5,color:COLORS.black}}>Hello Hello Hello</Text>
            <Text style={{...FONTS.body6,color:COLORS.darkgray}}>Module : 3 Lesson : 0</Text>
            <Text style={{...FONTS.body4,color:COLORS.primary}}>500000MMK</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:SIZES.padding2,
    marginBottom:SIZES.padding2 * 1.6,
  },
  cardContainer: {
    borderRadius:SIZES.radius,
    borderWidth:0.5,
    borderColor:COLORS.primary,
    padding:SIZES.padding - 3,
    width:SIZES.width / 1.5,
    flexDirection:"row",
    marginEnd:SIZES.padding
  },
  image : {
    width:70,
    height:70,
    borderRadius:SIZES.radius
  },
  textContainer : {
    marginStart:SIZES.padding,
    flex:1,
    justifyContent:"space-between"
  }
});

export default PopularCourseCard;
