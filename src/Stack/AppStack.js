import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabScreen from "../Screen/BottomTabScreen";
import AppProvider from "../Provider/AppProvider";
import ChangeLanguageScreen from "../Screen/Profile/ChangeLanguageScreen";
import CourseWatchingScreen from "../Screen/Course/CourseWatchingScreen";
import CourseDetailScreen from "../Screen/Course/CourseDetailScreen";
import SavedCourseScreen from "../Screen/Course/SavedCourseScreen";
import SearchScreen from "../Screen/Search/SearchScreen";

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <AppProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BottomTabScreen" component={BottomTabScreen} />
        <Stack.Screen name="ChangeLanguageScreen" component={ChangeLanguageScreen} />
        <Stack.Screen name='CourseDetailScreen' component={CourseDetailScreen} />
        <Stack.Screen name='CourseWatchingScreen' component={CourseWatchingScreen} />
        <Stack.Screen name='SavedCourseScreen' component={SavedCourseScreen} />
        <Stack.Screen name='SearchScreen' component={SearchScreen} />
      </Stack.Navigator>
    </AppProvider>
  );
}

export default AppStack;
