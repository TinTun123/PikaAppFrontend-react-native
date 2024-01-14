import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Pressable, Text, FlatList, Alert } from "react-native";
import { COLORS, FONTS, SIZES } from "../../Theme/Theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
import { searchCoursesApi } from "../../api/api";
import { AppContext } from "../../Provider/AppProvider";
import { throttle } from 'lodash';

const SearchScreen = props => {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [courses, setCourses] = useState([]);
  const [end, setEnd] = useState(false);
  const { config } = useContext(AppContext);

  const handleEnd = () => {
    if (end) {
      return;
    }
    setPage(pre => pre + 1);
  }

  const fetchCourses = throttle(async function (inputPage = null) {
    const search = searchText ?? '';
    const currentPage = inputPage ?? page;
    if (!search) {
      return;
    }
    try {
      let res = await axios.get(`${searchCoursesApi}?search=${search ?? ''}&page=${currentPage}`, config);
      if (!res.data.courses.next_page_url) {
        setEnd(true);
      }
      if (page === 1) {
        setCourses([...res.data.courses.data]);
      } else {
        setCourses(pre => ([...pre, ...res.data.courses.data]));
      }
    } catch (e) {
      console.log(e)
      Alert.alert('Error', e.message);
    }
  }, 500)

  useEffect(() => {
    setPage(1);
    setEnd(false);

    if (searchText) {
      console.log('true');
      fetchCourses(1);
    } else {
      console.log('false');
      setCourses([]);
      setPage(1);
    }
  }, [searchText]);

  useEffect(() => {
    if (!searchText) {
      setCourses([]);
    } else {
      fetchCourses(page);
    }
  }, [page]);

  useEffect(() => {
    if (!searchText) {
      setTimeout(() => {
        setCourses([]);
        setPage(1);
      }, 200)
    }
  }, [page, searchText]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchFieldContainer}>
        <View style={styles.searchBox}>
          <View style={styles.firstContainer}>
            <Ionicons color={COLORS.darkgray} size={20} name="search-outline" />
          </View>
          <TextInput
            onChangeText={(text) => setSearchText(text ?? '')} placeholderTextColor={COLORS.darkgray}
            placeholder="Search Courses" style={styles.searchFiled} />
          <Pressable android_ripple={{ color: COLORS.lightGray3, borderless: true }}
            style={styles.secondContainer}
            onPress={() => {
            }}>
            <MaterialCommunityIcons color={COLORS.darkgray} size={25} name="microphone-outline" />
          </Pressable>
        </View>
      </View>
      <View showsVerticalScrollIndicator={false} style={styles.subContainer}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={courses}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEnd}
          onEndReachedThreshold={0.2}
          renderItem={({ item, index }) => (
            <Pressable onPress={() => {
              props.navigation.navigate("CourseDetailScreen", item.id);
            }} android_ripple={{ color: COLORS.lightGray3 }} style={styles.listItem}>
              <Text numberOfLines={1} ellipsizeMode={"tail"}
                style={styles.resultText}>{item.title}</Text>
              <Pressable android_ripple={{ color: COLORS.lightGray3 }}>
                <Feather color={COLORS.black} size={20} name="arrow-up-right" />
              </Pressable>
            </Pressable>
          )} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchFieldContainer: {
    backgroundColor: COLORS.white,
    height: SIZES.height / 9,
    width: "100%",
    alignItems: "center",
    paddingVertical: SIZES.padding * 2,
  },
  searchBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  firstContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightGray3,
    height: 45,
    paddingVertical: SIZES.padding,
    paddingStart: SIZES.padding * 2,
    paddingEnd: SIZES.padding,
    borderTopLeftRadius: SIZES.roundRadius,
    borderBottomLeftRadius: SIZES.roundRadius,
  },
  searchFiled: {
    height: 45,
    backgroundColor: COLORS.lightGray3,
    width: "65%",
    ...FONTS.body4,

  },
  subContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    width: "100%",
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
  },
  secondContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightGray3,
    height: 45,
    paddingVertical: SIZES.padding,
    paddingEnd: SIZES.padding * 2,
    borderTopRightRadius: SIZES.roundRadius,
    borderBottomRightRadius: SIZES.roundRadius,
  },
  listItem: {
    paddingHorizontal: SIZES.padding * 3,
    backgroundColor: COLORS.white,
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.lightGray3,
  },
  resultText: {
    ...FONTS.body3,
    color: COLORS.black,
    width: "80%",
  },
});


export default SearchScreen;
