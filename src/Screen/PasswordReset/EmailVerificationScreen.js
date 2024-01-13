import React, { useContext } from "react";
import { Text, View, StyleSheet, StatusBar, Alert } from "react-native";
import ConfirmationCodeInput from "react-native-confirmation-code-input";
import ScreenHeaderBarComponentForAuthStack from "../../Component/ScreenHeaderBarComponentForAuthStack";
import { COLORS, FONTS, SIZES } from "../../Theme/Theme";


const EmailVerificationScreen = props => {

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={"dark-content"} />
      <ScreenHeaderBarComponentForAuthStack headerText="Verify Code" containBack={true} />
      <View style={styles.subContainer}>

        <Text style={{ ...FONTS.body4, color: COLORS.secondary, marginTop: SIZES.padding2 * 3 }}>Please enter your verification code!</Text>
        <ConfirmationCodeInput
          keyboardType="numeric"
          codeLength={4}
          className="border-circle"
          compareWithCode={`${props.route.params.code}`}
          autoFocus={true}
          activeColor={COLORS.primary}
          inactiveColor={COLORS.darkgray}
          space={15}
          size={40}
          codeInputStyle={{
            fontWeight: "800",
            borderColor: COLORS.primary,
            color: COLORS.primary, ...FONTS.h4,
          }}
          onFulfill={(isValid, code) => {
            if (isValid) {
              props.navigation.navigate("PasswordResetScreen", { email: props.route.params.email, code: props.route.params.code })
            } else {
              Alert.alert('Error', 'Invalid verify code, please try again!');
            }
          }}
        />
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
    justifyContent: "center",
    alignItems: "center"

  }
})

export default EmailVerificationScreen;