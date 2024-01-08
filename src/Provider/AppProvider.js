import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";
import { BASE_URL, getUserInfoApi } from "../api/api";
import { Alert } from "react-native";

export const AppContext = createContext();

const AppProvider = ({ children }) => {

  const { token, setAlreadyLogin } = useContext(AuthContext);
  const [user, setUser] = useState({});

  let config = {
    baseURL: BASE_URL,
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  };

  const getUser = async () => {
    try {
      let res = await axios.get(getUserInfoApi, config);
      console.log(res.data.user);
      setUser(res.data.user);
    } catch (e) {
      console.log(e.response.status);
      if (e.response.status === 401) {
        // Alert.alert('')
      }
    }
  }


  useEffect(() => {
    getUser();
  }, []);

  return (
    <AppContext.Provider value={{ config, user }}>
      {children}
    </AppContext.Provider>
  )
}


export default AppProvider;