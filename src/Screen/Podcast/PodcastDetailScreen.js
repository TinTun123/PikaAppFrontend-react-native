import React, { useContext, useState } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../Global/Styles";
import { useQuery } from "react-query";
import { getSinglePodcastApi } from "../../api/api";
import axios from "axios";
import { AppContext } from "../../Provider/AppProvider";
import ScreenHeaderBarComponent from "../../Component/ScreenHeaderBarComponent";
import FullScreenShadowLoading from "../../Component/FullScreenShadowLoading";
import { COLORS, FONTS, SIZES } from "../../Theme/Theme";
import TrackPlayer from "react-native-track-player";

const PodcastDetailScreen = (props) => {
  const id = props.route.params.id;
  const width = Dimensions.get('window').width;

  const { config } = useContext(AppContext);
  const [podcast, setPodcast] = useState({});

  const { isLoading } = useQuery(`${getSinglePodcastApi}/${id}`, () => axios.get(`${getSinglePodcastApi}/${id}`, config), {
    onSuccess: (res) => {
      setPodcast(res.data.podcast);
    },
    onError: (e) => {
      console.log(e);
    }
  });

  const listenNow = async () => {
    const track = await TrackPlayer.getActiveTrack();
    console.log(track);
    if (track?.id) {
      if (track.id != podcast.id) {
        await TrackPlayer.reset();
      }
    }
    props.navigation.navigate('AudioPlayingScreen', { podcast });
  }

  return (
    <View style={{ ...globalStyles.container, position: 'relative' }}>
      <ScreenHeaderBarComponent headerText={'Podcast Detail'} />

      <TouchableOpacity style={{ position: 'absolute', bottom: 50, backgroundColor: COLORS.primary, zIndex: 10, padding: SIZES.padding, borderRadius: SIZES.roundRadius, right: 10 }}
        onPress={listenNow}>
        <Text style={{ color: COLORS.white, }}>Educate yourself now</Text>
      </TouchableOpacity>

      {
        isLoading ?
          <FullScreenShadowLoading />
          :
          <ScrollView showsVerticalScrollIndicator={false} style={{ ...globalStyles.subContainer }}>
            <View>
              <Image style={styles.image} source={{
                uri: podcast?.image
              }} />
              <Text style={{ ...FONTS.body3, color: COLORS.black, textAlign: 'center', }}>{podcast.title}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={styles.price}>
                  {podcast.type === 'free' ? 'FREE' : (+podcast.price)?.toLocaleString('en-US') + ' MMK'}
                </Text>
              </View>
              <View style={{ paddingBottom: SIZES.padding2 * 2.5 }}>
                <Text style={{ ...FONTS.body4, color: COLORS.black, }}>Description</Text>
                <Text style={{ ...FONTS.body5, paddingTop: SIZES.padding - 5 }}>
                  {podcast.description}
                </Text>
                <Text style={{ ...FONTS.body4, color: COLORS.black, marginTop: SIZES.padding + 5 }}>Author</Text>
                <Text style={{ ...FONTS.body5, paddingTop: SIZES.padding - 5 }}>
                  {podcast.author}
                </Text>
              </View>
            </View>
          </ScrollView>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: SIZES.width / 2,
    resizeMode: 'cover',
    marginBottom: SIZES.padding,
  },
  price: {
    ...FONTS.body3,
    paddingTop: 3,
    color: COLORS.black,
    textAlign: 'center',
    minWidth: '40%',
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    color: COLORS.primary,
    paddingHorizontal: SIZES.padding
  }
})

export default PodcastDetailScreen;