
import { ThemeProvider } from "styled-components/native";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from "./src/theme";

import { AccountProvider, AccountContext } from "../share-bugs/src/services/account/account.context";
import React from 'react';
import Navigation from './src/infrastracture/navigation/index';


import {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";

import { Quicksand_400Regular } from "@expo-google-fonts/quicksand";

let customFonts = {
  PP_Thin: Poppins_100Thin,
  PP_ExtraLight: Poppins_200ExtraLight,
  PP_Light: Poppins_300Light,
  PP_Regular: Poppins_400Regular,
  PP_Medium: Poppins_500Medium,
  PP_SemiBold: Poppins_600SemiBold,
  PP_Bold: Poppins_700Bold,
  QS_Regular: Quicksand_400Regular,
};


export default function App() {

  let [fontsLoaded] = useFonts(customFonts);
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <AccountProvider>
          <Navigation />
        </AccountProvider>
        <StatusBar translucent />
      </SafeAreaProvider>
    </ThemeProvider>
  );

}

