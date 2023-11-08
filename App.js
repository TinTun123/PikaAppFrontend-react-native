import React from "react";
import { View } from "react-native";
import AuthProvider from "./src/Provider/AuthProvider";
import Route from "./src/Route/Route";

const App = props => {
  return (
    <AuthProvider>
      <Route/>
    </AuthProvider>
  )
}

export default App;
