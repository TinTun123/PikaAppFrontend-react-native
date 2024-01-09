import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS, SIZES, FONTS } from "../../Theme/Theme";
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const LastPlayed = () => {
  return (
    <View style={{ gap: 15 }}>
      {
        [...new Array(3).keys()].map(item => (
          <View key={item} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Image style={{ width: 80, height: 80, borderRadius: SIZES.radius }} source={require('../../Graphic/DummyImage/profile.png')} />
              <View style={{ justifyContent: 'space-between', width: '64%' }}>
                <Text style={{ ...FONTS.body5, color: COLORS.black, overflow: 'hidden' }}>The Joe Rogan Experience fdsfsf </Text>
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                  <Image style={styles.smallProfile} source={require('../../Graphic/DummyImage/profile.png')} />
                  <Text style={styles.tagStyle} >Pika Sharing</Text>
                </View>
                <View style={{}}>
                  <Text style={{ ...FONTS.body7, color: COLORS.black }}>1h 20m played</Text>
                  <View style={{ position: 'relative' }}>

                    <View style={{ position: 'absolute', width: '100%', backgroundColor: COLORS.lightGray4, padding: 2, borderRadius: SIZES.radius }} />

                    <View style={{ position: 'absolute', width: '50%', backgroundColor: COLORS.primary, padding: 2, borderRadius: SIZES.radius }}>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity>
              <FontAwesome name={'play-circle'} size={30} color={COLORS.primary} />
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

export default LastPlayed
