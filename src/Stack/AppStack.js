import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screen/HomeScreen";
import BottomTabScreen from "../Screen/BottomTabScreen";
import AppProvider from "../Provider/AppProvider";

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <AppProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BottomTabScreen" component={BottomTabScreen} />
      </Stack.Navigator>
    </AppProvider>
  );
}

export default AppStack;
