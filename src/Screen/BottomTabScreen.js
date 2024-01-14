import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screen/HomeScreen";
import { Text, View } from "react-native";
import { COLORS, FONTS } from "../Theme/Theme";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProfileScreen from "./Profile/ProfileScreen";
import PodcastScreen from "./PodcastScreen";
import CourseScreen from "./Course/CourseScreen";
import CategoryScreen from "./Category/CategoryScreen";

const Stack = createBottomTabNavigator();
const Icon = ({ name, focused, text }) => {

  const Dynamic = () => {
    if (name === 'podcast') {
      return <FontAwesome name={name} size={20} color={focused ? COLORS.primary : COLORS.darkgray} />
    } else if (name === 'play-lesson') {
      return <MaterialIcons name={name} size={20} color={focused ? COLORS.primary : COLORS.darkgray} />
    } else {
      return <Feather name={name} size={20} color={focused ? COLORS.primary : COLORS.darkgray} />
    }
  }

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      {Dynamic()}
      <Text style={{ color: focused ? COLORS.primary : COLORS.darkgray, ...FONTS.body6 }}>{text}</Text>
    </View>
  );
};
function BottomTabScreen() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,
      tabBarStyle: {
        height: 70,
      },
    }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ tabBarIcon: ({ focused }) => <Icon name={"home"} text={"Home"} focused={focused} /> }}
      />
      <Stack.Screen
        name="PodcastScreen"
        component={PodcastScreen}
        options={{ tabBarIcon: ({ focused }) => <Icon name={"podcast"} text={"Podcast"} focused={focused} /> }}
      />
      <Stack.Screen
        name="LibraryScreen"
        component={CourseScreen}
        options={{ tabBarIcon: ({ focused }) => <Icon name={"play-lesson"} text={"Course"} focused={focused} /> }}
      />
      <Stack.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={{ tabBarIcon: ({ focused }) => <Icon name={"grid"} text={"Category"} focused={focused} /> }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ tabBarIcon: ({ focused }) => <Icon name={"user"} text={"Profile"} focused={focused} /> }}
      />

    </Stack.Navigator>
  );
}

export default BottomTabScreen;
