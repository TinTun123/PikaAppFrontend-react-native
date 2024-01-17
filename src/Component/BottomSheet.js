import React, { useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { COLORS } from '../Theme/Theme';

function BottomSheet({ children, open, onClose }) {

  return (
    <View style={styles.flexView}>
      <StatusBar />
      <Modal
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        isVisible={open}
        swipeDirection="down"
        onSwipeComplete={onClose}
        animationInTiming={300}
        animationOutTiming={100}
        backdropTransitionInTiming={200}
        backdropTransitionOutTiming={100}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.center}>
            <View style={styles.barIcon} />
            {children}
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default BottomSheet;

const styles = StyleSheet.create({
  flexView: {
    flex: 1,
    backgroundColor: "white",
    position: 'absolute'
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 300,
    paddingBottom: 20,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: "#bbb",
    borderRadius: 3,
  },
  text: {
    color: "#bbb",
    fontSize: 24,
    marginTop: 100,
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
  },
});