import React, { useContext, useState } from "react";
import {
  Alert,
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
import { handleChange } from "../Global/Methods";
import { AuthContext } from "../Provider/AuthProvider";

const LoginScreen = (props) => {

  const { handleLogin } = useContext(AuthContext);
  const [data, setData] = useState({});


  const handleSubmit = () => {
    let fields = ["email", "password"];
    if (fields.some(field => !data[field])) {
      Alert.alert("Error", "Please fill in all the fields!");
    } else {
      handleLogin(data);
    }
  };


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
                  <Text style={styles.hText}>Login Here</Text>
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
                    placeholder="Username or email"
                    onChangeText={e => handleChange("email", e, setData)}
                  />
                  <TextInput
                    secureTextEntry
                    style={styles.input}
                    placeholderTextColor={COLORS.darkgray}
                    placeholder="Password"
                    onChangeText={e => handleChange("password", e, setData)}
                  />
                  <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: SIZES.padding }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("EmailInputScreen")}>
                      <Text style={{ ...FONTS.body5, color: COLORS.darkgray }}>Forgot Password?</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.button}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.btnText}>Login Now</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ marginTop: SIZES.padding2 }}
                                    onPress={() => props.navigation.navigate("SignupScreen")}>
                    <Text style={{ ...FONTS.body5, color: COLORS.secondInfo, textAlign: "center" }}>Don't have any
                      account , Please Signup</Text>
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
    flex: 0.2,
  },
  secondContainer: {
    flex: 0.8,
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

export default LoginScreen;
