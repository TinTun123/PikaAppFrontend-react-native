import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { COLORS, SIZES } from "../Theme/Theme";

const RoundedLogoComponent = props => {
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={require("../Graphic/logo.png")}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        width:120,
        height:120,
        backgroundColor:COLORS.white,
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        top:-60,
        borderRadius:SIZES.roundRadius * 3,
        borderWidth:5,
        borderColor:COLORS.lightGray2

    },
    image : {
        width:75,
        height:75,
        resizeMode:"contain",
    }

})


export default RoundedLogoComponent;