import { createContext, useState } from "react";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Alert } from "react-native";

export const AuthContext = createContext();


const AuthProvider = props => {
  const [alreadyLogin, setAlreadyLogin] = useState(true);

  // let config = {
  //     headers: {
  //         "Accept": "application/json",
  //         "Authorization": `Bearer ${token}`,
  //     },
  // };
  return (
    <AuthContext.Provider value={{
      alreadyLogin,
      handleLogin: (email,password) => {
        console.log(email,password);
      },
      handleSignUp : (email,password,confirmPassword) => {
        console.log(email,password,confirmPassword);
      },

    }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
