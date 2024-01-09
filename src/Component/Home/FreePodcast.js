import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS, SIZES, FONTS } from "../../Theme/Theme";

const FreePodcast = () => {


  const Card = () => {
    return (
      <TouchableOpacity style={styles.cardContainer}>
        <Image style={{ width: 60, height: 60, borderRadius: SIZES.radius }} source={require('../../Graphic/DummyImage/profile.png')} />
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
      </TouchableOpacity>
    )
  }
  return (

    <FlatList
      data={[1, 2, 3, 4, 5]}
      showsHorizontalScrollIndicator={false}
      horizontal
      // keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => (
        <Card key={index} />
      )}
    />

  )
}


const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: COLORS.primary,
    borderWidth: .4,
    padding: SIZES.padding - 2,
    gap: 10,
    marginRight: SIZES.padding,
    borderRadius: SIZES.radius,
  },
  tagStyle: {
    ...FONTS.body7,
    color: COLORS.black
  },
  smallProfile: {
    width: 20,
    height: 20,
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

export default FreePodcast;