import axios from "axios";
import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { BASE_URL, LoginApi, SignupApi } from "../api/api";

export const AuthContext = createContext();


const AuthProvider = props => {
  const [alreadyLogin, setAlreadyLogin] = useState(false);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);


  let config = {
    baseURL: BASE_URL,
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  };

  return (
    <AuthContext.Provider value={{
      alreadyLogin,
      setAlreadyLogin,
      loading,
      token,
      setToken,
      handleLogin: async (data) => {
        try {
          let res = await axios.post(LoginApi, data, config);
          AsyncStorage.setItem('@token', res.data.token, () => {
            setToken(res.data.token);
            setTimeout(() => {
              setAlreadyLogin(true);
            }, 500)
          })
        } catch (e) {
          Alert.alert('Error', e.response.data.message);
        }
      },
      handleSignUp: async (data) => {
        try {
          let res = await axios.post(SignupApi, data, config);
          console.log(res.data.token);
          AsyncStorage.setItem('@token', res.data.token, () => {
            setToken(res.data.token);
            setTimeout(() => {
              setAlreadyLogin(true);
            }, 500)
          })
        } catch (e) {
          Alert.alert('Error', e.message);
        }
      },
      restoreUserData: async () => {
        setLoading(true);
        AsyncStorage.getItem('@token').then(res => {
          if (res) {
            setToken(res);
            setAlreadyLogin(true);
          } else {
            setAlreadyLogin(false);
          }
          setLoading(false);
        }).catch((e) => {
          Alert.alert('Error', e);
        })
      }

    }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
