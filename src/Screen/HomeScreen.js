import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { COLORS, FONTS, SIZES } from "../Theme/Theme";
import Octicons from "react-native-vector-icons/Octicons";
import Feather from "react-native-vector-icons/Feather";
import Carousel from 'react-native-reanimated-carousel';
import { Vimeo } from "react-native-vimeo-iframe";
import WebView from "react-native-webview";

const HomeScreen = props => {
  const width = Dimensions.get('window').width;


  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.profileBar}>
          <View style={styles.profileNameSection}>
            <Image style={styles.profileImage} source={require("../Graphic/DummyImage/profile.png")} />
            <View>
              <Text style={{...FONTS.body4,color:COLORS.black,margin:0}}>Hello</Text>
              <Text style={styles.name}>Mariael</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notiBtn}>
            <Octicons color={COLORS.primaryBorder} size={18} name="bell"/>
          </TouchableOpacity>

        </View>
        <TouchableOpacity style={styles.searchBar}>
          <Text style={{...FONTS.body4,color:COLORS.darkgray}}>Search PodCast</Text>
          <Feather name="search" size={20} color={COLORS.darkgray}/>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>Suggested for you</Text>
          <Carousel
            style={{marginTop:SIZES.padding}}
            loop
            width={width}
            autoPlay={true}
            data={[...new Array(6).keys()]}
            scrollAnimationDuration={1000}
            // onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={({ index }) => (
                <Image style={[styles.carouselImage,{height:width/2}]} source={require("../Graphic/DummyImage/profile.png")}/>

            )}
          />


        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.padding2,
  },
  subContainer :{
    paddingHorizontal: SIZES.padding2 * 1.5,
    paddingTop:SIZES.padding2,
  },
  profileBar: {
    flexDirection:"row",
    justifyContent:"space-between",
    width:'100%'
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: SIZES.roundRadius,
    borderWidth: 1.5,
    borderColor: COLORS.primaryBorder,
    marginEnd:SIZES.padding
  },
  profileNameSection : {
    flexDirection:"row"
  },
  name : {
    ...FONTS.body3,
    color:COLORS.primary
  },
  notiBtn : {
    width:40,
    height:40,
    backgroundColor:COLORS.secondary,
    borderRadius:SIZES.roundRadius,
    justifyContent:"center",
    alignItems:"center"
  },
  searchBar : {
    width:'100%',
    backgroundColor:COLORS.lightGray2,
    marginVertical:SIZES.padding2 * 1.3,
    height:45,
    borderRadius:SIZES.roundRadius,
    flexDirection:"row",
    alignItems:"center",
    paddingHorizontal:SIZES.padding2 * 2,
    justifyContent:"space-between"

  },
  headerText : {
    ...FONTS.body4,
    color:COLORS.black
  },
  carouselImage : {
    height:230,
    resizeMode:"cover",
    borderRadius:SIZES.radius,
    width:'91%'
  }

});

export default HomeScreen;
