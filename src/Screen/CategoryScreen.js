import React from "react";
import { StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";
import { Vimeo } from "react-native-vimeo-iframe";

const CategoryScreen = props => {
  return(
    <View style={styles.container}>
        {/*<WebView*/}
        {/*  source={{ uri: 'https://player.vimeo.com/video/889851110' }}*/}
        {/*  style={{ height: 200 }}*/}
        {/*/>*/}
      <Vimeo
        videoId={'889851110'}
        params={'api=1&autoplay=1'}

        // handlers={videoCallbacks}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex:1

  }
})

export default CategoryScreen
