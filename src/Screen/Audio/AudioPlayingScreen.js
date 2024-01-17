import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Button, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TrackPlayer, { State, usePlaybackState } from "react-native-track-player";
import { addTracks, setupPlayer } from "../../../services/trackPlayerServices";
import FullScreenShadowLoading from "../../Component/FullScreenShadowLoading";
import globalStyles from "../../Global/Styles";
import { COLORS, SIZES, FONTS } from "../../Theme/Theme";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Progress from "../../Component/Player/Progress";
import ScreenHeaderBarComponent from "../../Component/ScreenHeaderBarComponent";
import BottomSheet from "../../Component/BottomSheet";
import { AppContext } from "../../Provider/AppProvider";

const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];

const AudioPlayingScreen = (props) => {
  const podcast = props.route.params.podcast;
  const { isPlayerReady } = useContext(AppContext);
  const playBackState = usePlaybackState();
  const [rate, setRate] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const togglePlayback = async (playback) => {
    const track = TrackPlayer.getActiveTrack();
    if (track !== null) {
      if (playback.state === State.Paused || playback.state === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  }

  const skipToNext15s = async () => {
    const currentPosition = await TrackPlayer.getProgress();
    await TrackPlayer.seekTo(currentPosition.position + 15);
  }

  const skipToPrevious15s = async () => {
    const currentPosition = await TrackPlayer.getProgress();
    await TrackPlayer.seekTo(currentPosition.position - 15);
  }

  const getSpeed = async () => {
    let speed = await TrackPlayer.getRate();
    setRate(speed);
    await TrackPlayer.play();
  }

  const setSpeed = async (rate) => {
    await TrackPlayer.setRate(rate);
  }
  const addPodcast = async () => {
    await TrackPlayer.add([
      {
        id: podcast.id,
        url: podcast.playable_file,
        title: podcast.title,
        artist: 'no artist',
        duration: podcast.duration,
      }
    ])
  }

  useEffect(() => {
    if (isPlayerReady) {
      addPodcast();
      getSpeed();
    }
  }, [isPlayerReady]);

  useEffect(() => {
    if (isPlayerReady) {
      setSpeed(rate);
    }
  }, [rate]);


  if (!isPlayerReady) {
    return (
      <FullScreenShadowLoading />
    );
  }


  return (
    <View style={globalStyles.container}>
      <ScreenHeaderBarComponent headerText={'Listening'} />
      <View style={{ ...globalStyles.subContainer, flex: 1 }}>
        <View style={{ justifyContent: 'center', flexDirection: 'row', flex: 0.7, alignItems: 'center' }}>
          <Image style={styles.image} source={{
            uri: podcast.image
          }} />
        </View>
        <Text style={{ ...FONTS.body3, color: COLORS.black }}>{podcast.title}</Text>
        <Progress />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: SIZES.padding, width: '80%', marginHorizontal: 'auto' }}>
            <Pressable onPress={skipToPrevious15s}>
              <Ionicons name='play-skip-back' size={35} color={COLORS.primary} />
            </Pressable>
            <Pressable onPress={() => togglePlayback(playBackState)}>
              <Ionicons
                name={playBackState.state === State.Playing ? 'pause-circle' : 'play-circle'}
                size={40} color={COLORS.primary} />
            </Pressable>
            <Pressable onPress={skipToNext15s}>
              <Ionicons name='play-skip-forward' size={35} color={COLORS.primary} />
            </Pressable>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => setOpenModal(true)} style={{ paddingVertical: SIZES.padding }}>
            <Text style={{ color: COLORS.primary, ...FONTS.body4, textAlign: "center" }}>{rate}x</Text>
          </TouchableOpacity>
        </View>
        <BottomSheet open={openModal} onClose={() => setOpenModal(false)}>
          <View style={{ marginVertical: SIZES.padding }}>
            {
              speeds.map(speed => (
                <TouchableOpacity onPress={() => setRate(speed)} key={speed} style={{ padding: SIZES.padding, }}>
                  <Text style={{ ...FONTS.body4, color: speed === rate ? COLORS.primary : COLORS.black }}>{speed}x</Text>
                </TouchableOpacity>
              ))
            }
          </View>
        </BottomSheet>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  image: {
    height: SIZES.width / 2,
    width: SIZES.width / 2,
    borderRadius: SIZES.radius,
    resizeMode: 'contain',
  }
});

export default AudioPlayingScreen;  