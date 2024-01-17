import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";
import { BASE_URL, getUserInfoApi, logoutApi } from "../api/api";
import i18n from "../../services/ i18n";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TrackPlayer from "react-native-track-player";
import { setupPlayer } from "../../services/trackPlayerServices";


export const AppContext = createContext();
const initI18n = i18n;

const AppProvider = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState('en');

  const { token, setAlreadyLogin, setToken } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [podcast, setPodcast] = useState({});

  let config = {
    baseURL: BASE_URL,
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  };

  const setup = async () => {
    let isSetup = await setupPlayer();
    // const queue = await TrackPlayer.getQueue();
    // if (isSetup && queue.length <= 0) {
    //   await TrackPlayer.add([
    //     {
    //       id: podcast.id,
    //       url: podcast.playable_file,
    //       title: podcast.title,
    //       artist: 'no artist',
    //       duration: podcast.duration,
    //     }
    //   ]);
    // }
    setIsPlayerReady(isSetup);
  }

  useEffect(() => {
    setup();
  }, []);


  const handleLogout = async () => {
    try {
      let res = await axios.post(logoutApi, {}, config);
      AsyncStorage.removeItem('@token').then(res => {
        setToken('');
        setAlreadyLogin(false);
      })
    } catch (e) {
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
      setUser(res.data.user);
    } catch (e) {
      if (e.response.status === 401) {
        Alert.alert('Error', 'You are logged out!');
        setAlreadyLogin(false);
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
      t, lang, setLanguage, handleLogout,
      isPlayerReady, setIsPlayerReady,
      podcast, setPodcast,
    }}>
      {children}
    </AppContext.Provider>
  )
}


export default AppProvider;