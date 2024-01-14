import React from "react";
import { ActivityIndicator, View, StyleSheet, Modal } from "react-native";
import { COLORS } from '../Theme/Theme';

const FullScreenShadowLoading = props => {
  return (
    <Modal visible={true} transparent={true}>
      <View style={styles.container}>
        <ActivityIndicator size={60} color={COLORS.primary} />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.transparent
  }
})

export default FullScreenShadowLoading
