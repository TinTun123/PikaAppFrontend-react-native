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
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const CategoryScreen = props => {

  const { config } = useContext(AppContext);
  const {
    data: CourseCategory,
    isLoading: courseLoading,
  } = useQuery(`${courseCategoryApi}`, () => axios.get(`${courseCategoryApi}`, config));

  const {
    data: podcastCategory,
    isLoading: podcastLoading,
  } = useQuery(`${podcastCategoryApi}`, () => axios.get(`${podcastCategoryApi}`, config));


  return (
    <View style={globalStyles.container}>
      <ScreenHeaderBarComponent headerText={"Category"} />
      <View style={globalStyles.subContainer}>
        <TitleWithSeeMore showSeeMore={false}
                          handlePress={() => props.navigation.navigate("FullCategoryScreen", { type: "course" })}
                          title={"Course Category"} />
        {
          courseLoading ?
            <>
              <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
                {
                  [1,2,3,4,5,6].map((item)=>{
                    return(
                      <View style={{width:'31%',height:40,marginEnd:'1%',marginBottom:'1%'}}>
                        <SkeletonPlaceholder key={item}>
                          <SkeletonPlaceholder.Item width={"100%"} height={40} borderRadius={SIZES.radius}>
                          </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder>
                      </View>

                    )
                  })
                }

              </View>

            </>
            :
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {
                CourseCategory?.data?.categories.map((data, index) => {
                  return (
                    <CategoryButton key={data.id} item={data} type="course" />
                  );
                })
              }
            </View>

        }

        <TitleWithSeeMore showSeeMore={false}
                          handlePress={() => props.navigation.navigate("FullCategoryScreen", { type: "course" })}
                          title={"Podcast Category"} />
        {
          podcastLoading ?
            <>
              <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
                {
                  [1,2,3,4,5,6].map((item)=>{
                    return(
                      <View style={{width:'31%',height:40,marginEnd:'1%',marginBottom:'1%'}}>
                        <SkeletonPlaceholder key={item}>
                          <SkeletonPlaceholder.Item width={"100%"} height={40} borderRadius={SIZES.radius}>
                          </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder>
                      </View>

                    )
                  })
                }

              </View>

            </> :

            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {
                podcastCategory?.data?.categories.map((data, index) => {
                  return (
                    <CategoryButton key={data.id} item={data} type="podcast" />
                  );
                })
              }
            </View>

        }

      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CategoryScreen;
