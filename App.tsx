
import { AppState, StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from '@shopify/restyle';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import theme from "../share-bugs/src/theme";
import { SWRConfig } from 'swr';
import { AccountProvider, AccountContext } from "../share-bugs/src/services/account/account.context";
import React from 'react';
import Navigation from './src/infrastracture/navigation/index';



export default function App() {

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

