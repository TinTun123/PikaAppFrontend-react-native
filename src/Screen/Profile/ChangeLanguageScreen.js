import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../Theme/Theme";
import { AppContext } from "../../Provider/AppProvider";
import ScreenHeaderBarComponent from "../../Component/ScreenHeaderBarComponent";

const Languages = [
  {
    language: "English",
    locale: "en",
  },
  {
    language: "မြန်မာ",
    locale: "my",
  }
];
const ChangeLanguageScreen = () => {

  const { setLanguage, lang } = useContext(AppContext);
  const storeLanguage = (language) => {
    setLanguage(language);
  };

  return (
    <>
      <View style={styles.container}>
        <ScreenHeaderBarComponent headerText={'languages'} />
        <View>
          {
            Languages.map((item) => (
              <TouchableOpacity key={item.locale} style={styles.button} onPress={() => storeLanguage(item.locale)}>
                <Text style={{
                  color: item.locale === lang ? COLORS.primary : COLORS.black,
                  fontWeight: "bold",
                  fontSize: SIZES.body3,
                }}>{item.language}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    </>
  );
};

export default ChangeLanguageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    width: "100%",
  },
  button: {
    margin: SIZES.padding2,
  },
});