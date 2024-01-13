import React, { useContext, useState } from 'react'
import globalStyles from "../../Global/Styles";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScreenHeaderBarComponent from "../../Component/ScreenHeaderBarComponent";
import CourseCard from "../../Component/Course/CourseCard";
import { COLORS, FONTS, SIZES } from "../../Theme/Theme";
import { useQuery } from "react-query";
import { getSavedCourseApi } from "../../api/api";
import axios from "axios";
import { AppContext } from "../../Provider/AppProvider";

const SavedCourseScreen = (props) => {

  const { config } = useContext(AppContext);
  const [courses, setCourses] = useState([]);

  const { isLoading } = useQuery(getSavedCourseApi, () => axios.get(`${getSavedCourseApi}?page=1`, config), {
    onSuccess: (response) => {
      setCourses(response.data.courses.data);
    }
  });

  const handleEnd = () => {
    console.log('ending');
  }

  return (
    <View style={globalStyles.container}>
      <ScreenHeaderBarComponent headerText={'Saved Course'} />
      <View style={globalStyles.subContainer}>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={courses}
          onEndReached={handleEnd}
          renderItem={({ item }) => (
            <View style={{ paddingVertical: SIZES.padding }} key={item.id}>
              <CourseCard key={item.id} item={item} />
            </View>
          )}
        />

      </View>
    </View>
  )
}

const styles = StyleSheet.create({

})
export default SavedCourseScreen;