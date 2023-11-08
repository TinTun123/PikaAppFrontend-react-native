import { StatusBar } from "react-native";

const isAlreadyLogin = false;
import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "../Stack/AppStack";
import AuthStack from "../Stack/AuthStack";
import { AuthContext } from "../Provider/AuthProvider";

function Route(props) {
    const {
        alreadyLogin
    } = useContext(AuthContext);

    useEffect(() => {
        // restoreUserData();
    }, []);

    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <NavigationContainer>
                {
                    alreadyLogin ? <AppStack /> : <AuthStack />
                }
            </NavigationContainer>
        </>
    );
}

export default Route;