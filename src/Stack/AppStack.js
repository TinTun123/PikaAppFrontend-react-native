import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screen/HomeScreen";
import BottomTabScreen from "../Screen/BottomTabScreen";

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabScreen" component={BottomTabScreen} />
    </Stack.Navigator>
  );
}

export default AppStack;
