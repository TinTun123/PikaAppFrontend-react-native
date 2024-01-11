import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabScreen from "../Screen/BottomTabScreen";
import AppProvider from "../Provider/AppProvider";
import ChangeLanguageScreen from "../Screen/Profile/ChangeLanguageScreen";
import CourseDetail from "../Screen/Course/CourseDetail";
import CourseWatchingScreen from "../Screen/Course/CourseWatchingScreen";

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <AppProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BottomTabScreen" component={BottomTabScreen} />
        <Stack.Screen name="ChangeLanguageScreen" component={ChangeLanguageScreen} />
        <Stack.Screen name='CourseDetail' component={CourseDetail} />
        <Stack.Screen name='CourseWatchingScreen' component={CourseWatchingScreen} />
      </Stack.Navigator>
    </AppProvider>
  );
}

export default AppStack;
