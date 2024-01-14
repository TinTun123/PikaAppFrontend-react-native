import React, { useContext } from 'react'
import { FlatList, Text, View } from "react-native";
import globalStyles from "../../Global/Styles";
import ScreenHeaderBarComponent from "../../Component/ScreenHeaderBarComponent";
import CategoryButton from "../../Component/CategoryButton";
import { useQuery } from "react-query";
import { courseCategoryApi } from "../../api/api";
import axios from "axios";
import { AppContext } from "../../Provider/AppProvider";

const FullCategoryScreen = props => {

  const type = props.route.params.type;
  const header = type === 'course' ? 'Course Category' : 'Podcast Category';

  const { config } = useContext(AppContext);

  const { data } = useQuery(courseCategoryApi, () => axios.get(courseCategoryApi, config));

  console.log(data?.data?.categories);
  return (
    <View style={globalStyles.container}>
      <ScreenHeaderBarComponent headerText={header} />
      <View style={globalStyles.subContainer}>
        <FlatList
          data={data?.data?.categories}
          renderItem={({ item, index }) => (
            <CategoryButton key={item.id} item={item} type={type} />
          )}
        />
      </View>
    </View>
  )
}

export default FullCategoryScreen;