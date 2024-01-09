import React from 'react'
import PodcastCard from "../PodcastCard";
import { View } from "react-native";


const PopularPodcast = () => {
  return (
    <View style={{ gap: 13 }}>
      {
        [...new Array(2).keys()].map(item => (
          <PodcastCard key={item} item={item} />
        ))
      }
    </View>
  )
}



export default PopularPodcast;