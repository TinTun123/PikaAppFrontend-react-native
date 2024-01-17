import React from 'react'
import { Text, View } from "react-native";
import { useProgress } from "react-native-track-player";
import { COLORS, SIZES, FONTS } from "../../Theme/Theme";
import { formatVideoDuration } from "../../Global/Methods";

const Progress = () => {

  const { position, duration } = useProgress();

  return (
    <View style={{ marginVertical: SIZES.padding * 2 }}>
      <View style={{ position: 'relative', backgroundColor: COLORS.subGray, height: 7, borderRadius: SIZES.roundRadius }}>
        <View style={{ position: 'absolute', backgroundColor: COLORS.primary, height: 7, top: 0, left: 0, width: `${Math.floor((position / duration) * 100)}%`, borderRadius: SIZES.roundRadius }}></View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: SIZES.padding }}>
        <Text style={{ ...FONTS.body4 }}>
          {formatVideoDuration(position)}
        </Text>
        <Text style={{ ...FONTS.body4 }}>
          {formatVideoDuration(duration)}
        </Text>
      </View>
    </View>
  )
}

export default Progress;