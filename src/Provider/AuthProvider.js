import axios from "axios";
import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { BASE_URL, LoginApi, SignupApi, logoutApi } from "../api/api";

export const AuthContext = createContext();


const AuthProvider = props => {
  const [alreadyLogin, setAlreadyLogin] = useState(false);
  const [token, setToken] = useState("");


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
      token,
      handleLogin: async (data) => {
        try {
          let res = await axios.post(LoginApi, data, config);
          AsyncStorage.setItem('@token', res.data.token, () => {
            setAlreadyLogin(true);
            setToken(res.data.token);
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
            setAlreadyLogin(true);
            setToken(res.data.token);
          })
        } catch (e) {
          Alert.alert('Error', e.message);
        }
      },
      handleLogout: async () => {
        try {
          let res = await axios.post(logoutApi, {}, config);
          console.log(res.data);
          AsyncStorage.removeItem('@token').then(res => {
            setToken('');
            setAlreadyLogin(false);
          })
        } catch (e) {
          Alert.alert('Error', e.response?.data?.message ?? 'An error occur');
        }
      },
      restoreUserData: async () => {
        AsyncStorage.getItem('@token').then(res => {
          if (res) {
            setToken(res);
            setAlreadyLogin(true);
          } else {
            setAlreadyLogin(false);
          }
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
