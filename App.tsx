import { ThemeProvider } from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { theme } from "./src/theme/index";
import React from "react";
import Navigation from "./src/infrastracture/navigation/index";

import {
  useFonts,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { AccountProvider } from "./src/services/account/account.context";

const customFonts = {
  PP_Regular: Poppins_400Regular,
};

export default function App() {
  const [fontsLoaded] = useFonts(customFonts);

  if (!fontsLoaded) {
    return null; // Fontlar yüklenmeden uygulama yüklenmez.
  }

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <AccountProvider>

          <Navigation />
          <StatusBar translucent />

        </AccountProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
