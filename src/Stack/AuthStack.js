import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screen/HomeScreen";
import LoginScreen from "../Screen/LoginScreen";
import SignupScreen from "../Screen/SignupScreen";
import EmailInputScreen from "../Screen/PasswordReset/EmailInputScreen";
import EmailVerificationScreen from "../Screen/PasswordReset/EmailVerificationScreen";
import PasswordResetScreen from "../Screen/PasswordReset/PasswordResetScreen";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="EmailInputScreen" component={EmailInputScreen} />
      <Stack.Screen name="EmailVerificationScreen" component={EmailVerificationScreen} />
      <Stack.Screen name="PasswordResetScreen" component={PasswordResetScreen} />
    </Stack.Navigator>
  );
}

export default AuthStack;
