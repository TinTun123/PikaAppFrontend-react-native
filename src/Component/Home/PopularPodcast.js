import React, { useContext } from 'react'
import PodcastCard from "../PodcastCard";
import { View } from "react-native";
import { useQuery } from "react-query";
import { popularPodcastsWithLimit } from "../../api/api";
import axios from "axios";
import { AppContext } from "../../Provider/AppProvider";


const PopularPodcast = () => {

  const { config } = useContext(AppContext);

  const { isLoading, isError, data } = useQuery(popularPodcastsWithLimit, () => axios.get(popularPodcastsWithLimit, config), {
    onError: (e) => {
      console.log(e);
    }
  })

  return (
    <View style={{ gap: 15 }}>
      {
        !isError && !isLoading &&
        data?.data?.podcasts?.map(item => (
          <PodcastCard key={item.id} item={item} />
        ))
      }
    </View>
  )
}



export default PopularPodcast;