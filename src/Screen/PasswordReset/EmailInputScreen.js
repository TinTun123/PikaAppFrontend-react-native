import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
// import { AuthContext } from "../Provider/AuthProvider";
import { COLORS, FONTS, SIZES } from '../../Theme/Theme';
import ScreenHeaderBarComponentForAuthStack from "../../Component/ScreenHeaderBarComponentForAuthStack";
import { BASE_URL, forgetPassword } from "../../api/api";
import axios from "axios";
const EmailInputScreen = props => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true)
    const code = Math.floor(1000 + Math.random() * 9000);
    let data = { email, code }
    console.log(data)
    await axios.post(BASE_URL + forgetPassword, data).then((response) => {
      setLoading(false)
      ToastAndroid.show("OTP code send to your mail.", 1000)
      props.navigation.navigate("EmailVerificationScreen", { email, code })
    }).catch((error) => {
      console.log(error.response)
      setLoading(false)
      ToastAndroid.show("This email does not register!", 1000)
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={"dark-content"} />
      <ScreenHeaderBarComponentForAuthStack containBack={true} headerText="EmailVerification" />
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <View style={{ flex: 1, width: '100%', alignItems: "center", marginTop: SIZES.padding2 * 3 }}>
          <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholderTextColor={COLORS.darkgray} style={styles.input} placeholder="Please Enter your email" />
          <TouchableOpacity onPress={() => submit()} style={styles.submitBtn}>
            {
              loading ? (
                <ActivityIndicator size={30} color={COLORS.white} />
              ) : (
                <Text style={{ ...FONTS.body3, color: COLORS.white }}>Get Verification Code</Text>
              )
            }
          </TouchableOpacity>
        </View>

      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  input: {
    borderBottomWidth: 2,
    width: '85%',
    height: 45,
    borderBottomColor: COLORS.primary,
    color: COLORS.primary,
    ...FONTS.body3
  },
  submitBtn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: '85%',
    backgroundColor: COLORS.primary,
    marginTop: SIZES.padding2 * 1.5,
    borderRadius: SIZES.radius
  }

});

export default EmailInputScreen;