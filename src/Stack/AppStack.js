import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabScreen from "../Screen/BottomTabScreen";
import AppProvider from "../Provider/AppProvider";
import ChangeLanguageScreen from "../Screen/Profile/ChangeLanguageScreen";
import CourseWatchingScreen from "../Screen/Course/CourseWatchingScreen";
import CourseDetailScreen from "../Screen/Course/CourseDetailScreen";
import SavedCourseScreen from "../Screen/Course/SavedCourseScreen";
import SearchScreen from "../Screen/Search/SearchScreen";
import CourseFilterByCategoryScreen from "../Screen/Course/CourseFilterByCategoryScreen";
import FullCategoryScreen from "../Screen/Category/FullCategoryScreen";
import PodcastFilterByCategoryScreen from "../Screen/Podcast/PodcastFilterByCategoryScreen";
import DownloadScreen from "../Screen/Profile/DownloadScree";
import PaidCourseScreen from "../Screen/Profile/PaidCourseScreen";
import PaymentHistoryScreen from "../Screen/Profile/Setting/PaymentHistoryScreen";
import UpdateScreen from "../Screen/Profile/Setting/UpdateScreen";
import PrivacyAndPolicyScreen from "../Screen/Profile/Setting/PrivacyAndPolicyScreen";
import TermAndConditionScreen from "../Screen/Profile/Setting/TermAndConditionScreen";
import ContactUsScreen from "../Screen/Profile/Setting/ContactUsScreen";

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
        <Stack.Screen name='PodcastFilterByCategoryScreen' component={PodcastFilterByCategoryScreen} />
        <Stack.Screen name='CourseFilterByCategoryScreen' component={CourseFilterByCategoryScreen} />
        <Stack.Screen name='FullCategoryScreen' component={FullCategoryScreen} />
        <Stack.Screen name='DownloadScreen' component={DownloadScreen} />
        <Stack.Screen name='PaidCourseScreen' component={PaidCourseScreen} />
        <Stack.Screen name='PaymentHistoryScreen' component={PaymentHistoryScreen} />
        <Stack.Screen name='UpdateScreen' component={UpdateScreen} />
        <Stack.Screen name='PrivacyAndPolicyScreen' component={PrivacyAndPolicyScreen} />
        <Stack.Screen name='TermAndConditionScreen' component={TermAndConditionScreen} />
        <Stack.Screen name='ContactUsScreen' component={ContactUsScreen} />
      </Stack.Navigator>
    </AppProvider>
  );
}

export default AppStack;
