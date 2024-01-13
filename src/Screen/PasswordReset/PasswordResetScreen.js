import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, TextInput, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import ScreenHeaderBarComponentForAuthStack from "../../Component/ScreenHeaderBarComponentForAuthStack";
import { COLORS, FONTS, SIZES } from "../../Theme/Theme";
import axios from "axios";
import { BASE_URL, resetPasswordApi } from "../../api/api";


const PasswordResetScreen = props => {

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (password.length < 8) {
      Alert.alert('Error', 'Your password should be at least 8');
      return;
    }
    setLoading(true);
    const data = { code: props.route.params.code, email: props.route.params.email, password };
    console.log(data);
    try {
      let response = await axios.post(BASE_URL + resetPasswordApi, data)
      console.log(response.data);
      Alert.alert(
        "",
        `${response.data.message}`,
        [
          {
            text: "Login Again",
            onPress: () => props.navigation.navigate("LoginScreen"),
          },
        ]
      );
    } catch (e) {
      console.log(e.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeaderBarComponentForAuthStack containBack={true} headerText="Password Reset" />
      <View style={styles.subContainer}>
        <Text style={{ ...FONTS.body2, marginTop: SIZES.padding2, color: COLORS.black }}>Create New Password</Text>
        <Text style={{ ...FONTS.body4, marginVertical: SIZES.padding, color: COLORS.secondInfo }}>Your new password must
          be different from previous used passwords.</Text>
        <TextInput value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true}
          placeholder="New Password" placeholderTextColor={COLORS.darkgray} style={styles.input} />
        <Text style={{ ...FONTS.body5, color: COLORS.secondInfo }}>Minimum password length must be 8</Text>
        <TouchableOpacity onPress={() => submit()} style={styles.submitBtn}>
          {
            loading ? (
              <ActivityIndicator size={30} color={COLORS.white} />
            ) : (
              <Text style={{ ...FONTS.body3, color: COLORS.white }}>Reset Password</Text>
            )
          }
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white

  },
  subContainer: {
    flex: 1,
    paddingTop: SIZES.padding2,
    paddingHorizontal: SIZES.padding,
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
  submitBtn: {
    width: "100%",
    height: 50,
    marginTop: SIZES.padding,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.roundRadius,
    justifyContent: "center",
    alignItems: "center",
  },

});

export default PasswordResetScreen;