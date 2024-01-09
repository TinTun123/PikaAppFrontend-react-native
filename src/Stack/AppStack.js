import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabScreen from "../Screen/BottomTabScreen";
import AppProvider from "../Provider/AppProvider";
import ChangeLanguageScreen from "../Screen/Profile/ChangeLanguageScreen";

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <AppProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BottomTabScreen" component={BottomTabScreen} />
        <Stack.Screen name="ChangeLanguageScreen" component={ChangeLanguageScreen} />
      </Stack.Navigator>
    </AppProvider>
  );
}

export default AppStack;
