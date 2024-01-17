import React from 'react'
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../Theme/Theme";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";


const PodcastCard = ({ item }) => {

  const navigation = useNavigation();



  return (
    <Pressable onPress={() => navigation.navigate('PodcastDetailScreen', { id: item.id })} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Image style={{ width: 80, height: 80, borderRadius: SIZES.radius }} source={{
          uri: item.image
        }} />
        <View style={{ justifyContent: 'space-between', width: '47%' }}>
          <Text style={{ ...FONTS.body5, color: COLORS.black }}>{item.title}</Text>
          <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <Image style={styles.smallProfile} source={require('../Graphic/DummyImage/profile.png')} />
            <Text style={styles.tagStyle} >Pika Sharing</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }} >
              <MaterialCommunityIcons name={'clock-time-five'} size={14} color={COLORS.primaryInfo} />
              <Text style={styles.tagStyle} >1h 20m</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
              <AntDesign name={'tag'} size={14} color={COLORS.primaryInfo} />
              <Text style={styles.tagStyle} >{item.category?.name}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  tagStyle: {
    ...FONTS.body6,
    color: COLORS.black
  },
  smallProfile: {
    width: 25,
    height: 25,
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
export default PodcastCard;