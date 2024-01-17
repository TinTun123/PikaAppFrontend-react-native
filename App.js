import React, { useEffect } from "react";
import { View } from "react-native";
import AuthProvider from "./src/Provider/AuthProvider";
import Route from "./src/Route/Route";
import { LogLevel, OneSignal } from "react-native-onesignal";

const App = props => {
  useEffect(() => {

    if (__DEV__) {
      console.log();
    }

    OneSignal.Debug.setLogLevel(LogLevel.Debug);

    // OneSignal Initialization
    OneSignal.initialize("526af274-2111-4fe1-85e3-05e25eb0fb20");

    // requestPermission will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
    OneSignal.Notifications.requestPermission(true);

    // Method for listening for notification clicks
    OneSignal.Notifications.addEventListener('click', (event) => {
      console.log('OneSignal: notification clicked:', event);
    });
  }, [])
  return (
    <AuthProvider>
      <Route/>
    </AuthProvider>
  )
}

export default App;
