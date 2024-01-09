import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../../Theme/Theme";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";


const CourseCard = ({ item }) => {

  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Image style={{ width: 100, height: 100, borderRadius: SIZES.radius }} source={require('../../Graphic/DummyImage/profile.png')} />
        <View style={{ justifyContent: 'space-between', width: '48%' }}>
          <Text style={{ ...FONTS.body4, color: COLORS.black }}>The Joe Rogan Experience</Text>
          <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <Text style={styles.module}>Modules : 8  Lessons : 72</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }} >
              <MaterialCommunityIcons name={'clock-time-five'} size={14} color={COLORS.primaryInfo} />
              <Text style={styles.tagStyle} >10h 20m</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
              <Text style={styles.tagStyle}> &  1,000,000 mmk</Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('CourseDetail')} style={styles.detailButton}>
        <Text style={styles.detailText}>See Details</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  tagStyle: {
    ...FONTS.body6,
    color: COLORS.black
  },
  smallProfile: {
    width: 30,
    height: 30,
    borderRadius: SIZES.roundRadius
  },
  detailButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding - 2,
    height: 30,
    borderRadius: SIZES.roundRadius,
    justifyContent: 'center',
  },
  detailText: {
    color: COLORS.white,
    ...FONTS.body6,
  },
  module: {
    ...FONTS.body6,
    color: COLORS.black,
  }
});
export default CourseCard;