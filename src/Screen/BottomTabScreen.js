import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screen/HomeScreen";
import { Text, View } from "react-native";
import { COLORS, FONTS } from "../Theme/Theme";
import Feather from "react-native-vector-icons/Feather";

const Stack = createBottomTabNavigator();
const Icon = ({ name, focused , text }) => {
  return (
    <View style={{justifyContent:"center",alignItems:"center"}}>
      <Feather name={name} size={22} color={focused ? COLORS.primary : COLORS.darkgray} />
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
        height: 60,
      },
    }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ tabBarIcon: ({ focused }) => <Icon name={"home"} text={"Home"} focused={focused} /> }}
      />

    </Stack.Navigator>
  );
}

export default BottomTabScreen;
