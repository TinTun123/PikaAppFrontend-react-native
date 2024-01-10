import axios from "axios";
import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { BASE_URL, LoginApi, SignupApi } from "../api/api";
import { QueryClient, QueryClientProvider } from "react-query";

export const AuthContext = createContext();

const queryClient = new QueryClient();

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

  const handleLogin = async (data) => {
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
  }
  const handleSignUp = async (data) => {
    try {
      let res = await axios.post(SignupApi, data, config);
      AsyncStorage.setItem('@token', res.data.token, () => {
        setToken(res.data.token);
        setTimeout(() => {
          setAlreadyLogin(true);
        }, 500)
      })
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  }
  const restoreUserData = async () => {
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
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{
        alreadyLogin,
        setAlreadyLogin, handleSignUp, loading, token, setToken, handleLogin, restoreUserData,
      }}>
        {props.children}
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default AuthProvider;
