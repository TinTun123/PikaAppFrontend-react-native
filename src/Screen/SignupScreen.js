import React from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../Theme/Theme";
import RoundedLogoComponent from "../Component/RoundedLogoComponent";
import CopyRightComponent from "../Component/CopyRightComponent";

const SignupScreen = (props) => {
  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
          <View style={styles.firstContainer}></View>
          <View style={styles.secondContainer}>
            <RoundedLogoComponent />
            <View style={styles.formContainer}>
              <ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
                <View style={{ width: "100%" }}>
                  <Text style={styles.hText}>SignUp Here</Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: SIZES.padding - 7,
                    paddingVertical: SIZES.padding - 3,
                    flex: 1,  // Add this line to make the ScrollView flex to fill the available space
                  }}
                >
                  <TextInput
                    style={styles.input}
                    placeholderTextColor={COLORS.darkgray}
                    placeholder="Email or Phone Number"
                  />
                  <TextInput
                    secureTextEntry
                    style={styles.input}
                    placeholderTextColor={COLORS.darkgray}
                    placeholder="Password"
                  />
                  <TextInput
                    secureTextEntry
                    style={styles.input}
                    placeholderTextColor={COLORS.darkgray}
                    placeholder="Confirm Password"
                  />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.button}
                  >
                    <Text style={styles.btnText}>SignUp Now</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>props.navigation.navigate("LoginScreen")} style={{marginTop:SIZES.padding2}}>
                    <Text style={{...FONTS.body5,color:COLORS.secondInfo,textAlign:"center"}}>Already have account? , Please Login</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
            <CopyRightComponent />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  firstContainer: {
    flex: 0.19,
  },
  secondContainer: {
    flex: 0.81,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radius * 5,
    borderTopRightRadius: SIZES.radius * 5,
    alignItems: "center",
  },
  formContainer: {
    paddingTop: 70,
    width: "100%",
    paddingHorizontal: SIZES.padding * 1.5,
    alignItems: "center",
    paddingBottom: SIZES.padding2 * 3,
  },
  hText: {
    ...FONTS.body2,
    textAlign: "left",
    color: COLORS.primary,
    marginBottom: SIZES.padding * 2,
  },
  input: {
    width: "100%",
    height: 50,
    ...FONTS.body4,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding2 * 1.3,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.roundRadius,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: COLORS.white,
    ...FONTS.body3,
  },

});

export default SignupScreen;
