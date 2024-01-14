import React, { useContext, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../Global/Styles";
import ScreenHeaderBarComponent from "../../Component/ScreenHeaderBarComponent";
import TitleWithSeeMore from "../../Component/Home/TitleWithSeeMore";
import { COLORS, FONTS, SIZES } from "../../Theme/Theme";
import { courseCategoryApi, podcastCategoryApi } from "../../api/api";
import { useQuery } from "react-query";
import axios from "axios";
import { AppContext } from "../../Provider/AppProvider";
import CategoryButton from "../../Component/CategoryButton";


const CategoryScreen = props => {

  const { config } = useContext(AppContext);
  const { data: CourseCategory, isLoading: courseLoading } = useQuery(`${courseCategoryApi}?limit=5`, () => axios.get(`${courseCategoryApi}?limit=5`, config));

  const { data: podcastCategory, isLoading: podcastLoading } = useQuery(`${podcastCategoryApi}?limit=5`, () => axios.get(`${podcastCategoryApi}?limit=5`, config));



  return (
    <View style={globalStyles.container}>
      <ScreenHeaderBarComponent headerText={'Category'} />
      <View style={globalStyles.subContainer}>
        <TitleWithSeeMore handlePress={() => props.navigation.navigate('FullCategoryScreen', { type: 'course' })} title={'Course Category'} />
        <FlatList
          data={CourseCategory?.data?.categories}
          renderItem={({ item }) => (
            <CategoryButton key={item.id} item={item} type='course' />
          )}
        />
        <TitleWithSeeMore handlePress={() => props.navigation.navigate('FullCategoryScreen', { type: 'course' })} title={'Podcast Category'} />
        <FlatList
          data={podcastCategory?.data?.categories}
          renderItem={({ item }) => (
            <CategoryButton key={item.id} item={item} type='podcast' />
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

})

export default CategoryScreen