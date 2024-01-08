import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screen/HomeScreen";
import { Text, View } from "react-native";
import { COLORS, FONTS } from "../Theme/Theme";
import Feather from "react-native-vector-icons/Feather";
import Foundation from "react-native-vector-icons/Foundation";
import CategoryScreen from "./CategoryScreen";
import LibraryScreen from "./LibraryScreen";
import FavoriteScreen from "./FavouriteScreen";
import ProfileScreen from "./ProfileScreen";

const Stack = createBottomTabNavigator();
const Icon = ({ name, focused , text }) => {
  return (
    <View style={{justifyContent:"center",alignItems:"center"}}>
      <Feather name={name} size={20} color={focused ? COLORS.primary : COLORS.darkgray} />
      <Text style={{color:focused ? COLORS.primary : COLORS.darkgray,...FONTS.body6}}>{text}</Text>
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
        name="CategoryScreen"
        component={CategoryScreen}
        options={{ tabBarIcon: ({ focused }) => <Icon name={"grid"} text={"Category"} focused={focused} /> }}
      />
      <Stack.Screen
        name="LibraryScreen"
        component={LibraryScreen}
        options={{ tabBarIcon: ({ focused }) => <Icon name={"bookmark"} text={"Library"} focused={focused} /> }}
      />
      <Stack.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{ tabBarIcon: ({ focused }) => <Icon name={"heart"} text={"Favorite"} focused={focused} /> }}
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
