import React, { useContext } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { COLORS, FONTS, SIZES } from "../Theme/Theme";
import Octicons from "react-native-vector-icons/Octicons";
import Feather from "react-native-vector-icons/Feather";
import Carousel from 'react-native-reanimated-carousel';
import PopularPodcast from "../Component/Home/PopularPodcast";
import FreePodcast from "../Component/Home/FreePodcast";
import TitleWithSeeMore from "../Component/Home/TitleWithSeeMore";
import LastPlayed from "../Component/Home/LastPlayed";
import { AppContext } from "../Provider/AppProvider";


const HomeScreen = props => {
  const width = Dimensions.get('window').width;
  const { t, setLanguage } = useContext(AppContext);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ ...styles.subContainer, paddingBottom: SIZES.padding * 4 }}>
        <View style={styles.profileBar}>
          <View style={styles.profileNameSection}>
            <Image style={styles.profileImage} source={require("../Graphic/DummyImage/profile.png")} />
            <View>
              <Text style={{ ...FONTS.body4, color: COLORS.black, margin: 0 }}>{t('hello')}</Text>
              <Text style={styles.name}>Mariael</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notiBtn}>
            <Octicons color={COLORS.primaryBorder} size={18} name="bell" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.searchBar}>
          <Text style={{ ...FONTS.body4, color: COLORS.darkgray }}>Search PodCast</Text>
          <Feather name="search" size={20} color={COLORS.darkgray} />
        </TouchableOpacity>

        <View style={{ height: width / 1.5 }}>
          <Text style={styles.headerText}>Suggested for you</Text>
          <Carousel
            style={{ marginTop: SIZES.padding }}
            loop
            width={width}
            autoPlay={true}
            data={[...new Array(6).keys()]}
            scrollAnimationDuration={1000}
            // onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={({ index }) => (
              <Image style={[styles.carouselImage, { height: width / 2 }]} source={require("../Graphic/DummyImage/profile.png")} />
            )}
          />
        </View>

        <View>
          <TitleWithSeeMore title={'Popular Topics'} />
          <PopularPodcast />
        </View>
        <View>
          <TitleWithSeeMore title={'Free Topics'} />
          <FreePodcast />
        </View>
        <View>
          <TitleWithSeeMore title={'Last Played'} />
          <LastPlayed />
        </View>
      </View>
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.padding2,
  },
  subContainer: {
    paddingHorizontal: SIZES.padding2 * 1.5,
    paddingTop: SIZES.padding2,
  },
  profileBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%'
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: SIZES.roundRadius,
    borderWidth: 1.5,
    borderColor: COLORS.primaryBorder,
    marginEnd: SIZES.padding
  },
  profileNameSection: {
    flexDirection: "row"
  },
  name: {
    ...FONTS.body3,
    color: COLORS.primary
  },
  notiBtn: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.roundRadius,
    justifyContent: "center",
    alignItems: "center"
  },
  searchBar: {
    width: '100%',
    backgroundColor: COLORS.lightGray2,
    marginVertical: SIZES.padding2 * 1.3,
    height: 45,
    borderRadius: SIZES.roundRadius,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SIZES.padding2 * 2,
    justifyContent: "space-between"

  },
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
});

export default HomeScreen;
