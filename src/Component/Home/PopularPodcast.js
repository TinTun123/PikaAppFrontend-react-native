import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS, SIZES, FONTS } from "../../Theme/Theme";


const PopularPodcast = () => {
  return (
    <View style={{ gap: 13 }}>
      {
        [...new Array(2).keys()].map(item => (
          <View key={item} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Image style={{ width: 80, height: 80, borderRadius: SIZES.radius }} source={require('../../Graphic/DummyImage/profile.png')} />
              <View style={{ justifyContent: 'space-between' }}>
                <Text style={{ ...FONTS.body5, color: COLORS.black }}>The Joe Rogan Experience</Text>
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                  <Image style={styles.smallProfile} source={require('../../Graphic/DummyImage/profile.png')} />
                  <Text style={styles.tagStyle} >Pika Sharing</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }} >
                    <MaterialCommunityIcons name={'clock-time-five'} size={14} color={COLORS.primaryInfo} />
                    <Text style={styles.tagStyle} >1h 20m</Text>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                    <AntDesign name={'tag'} size={14} color={COLORS.primaryInfo} />
                    <Text style={styles.tagStyle} >Motivation</Text>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.detailButton}>
              <Text style={styles.detailText}>See Details</Text>
            </TouchableOpacity>
          </View>
        ))
      }
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
    ...FONTS.body5,
  }
});
export default PopularPodcast;