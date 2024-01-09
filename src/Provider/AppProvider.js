import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";
import { BASE_URL, getUserInfoApi, logoutApi } from "../api/api";
import i18n from "../../services/ i18n";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const AppContext = createContext();
const initI18n = i18n;

const AppProvider = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState('en');

  const { token, setAlreadyLogin, setToken } = useContext(AuthContext);
  const [user, setUser] = useState({});

  let config = {
    baseURL: BASE_URL,
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  };
  const handleLogout = async () => {
    try {
      let res = await axios.post(logoutApi, {}, config);
      console.log(res.data);
      AsyncStorage.removeItem('@token').then(res => {
        setToken('');
        setAlreadyLogin(false);
      })
    } catch (e) {
      console.log(e.response.data);
      Alert.alert('Error', e.response?.data?.message ?? 'An error occur');
    }
  }

  const setLanguage = async (language) => {
    try {
      await i18n.changeLanguage(language);
      await AsyncStorage.setItem("@language", language);
      setLang(language);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }
  const getLanguage = async () => {
    try {
      let lang = await AsyncStorage.getItem("@language");
      if (lang) {
        await i18n.changeLanguage(lang);
        setLang(lang);
      } else {
        await i18n.changeLanguage('en');
      }
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  useEffect(() => {
    getLanguage();
  }, []);

  const getUser = async () => {
    try {
      let res = await axios.get(getUserInfoApi, config);
      console.log(res.data.user);
      setUser(res.data.user);
    } catch (e) {
      console.log(e.response.status);
      if (e.response.status === 401) {
        Alert.alert('Error', 'You are logged out!');

      }
    }
  }


  useEffect(() => {
    getUser();
  }, []);

  return (
    <AppContext.Provider value={{
      config,
      user,
      t, lang, setLanguage, handleLogout
    }}>
      {children}
    </AppContext.Provider>
  )
}


export default AppProvider;