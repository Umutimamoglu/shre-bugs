import React from "react";
import { ThemeProvider } from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { theme } from "./src/theme/index";
import Navigation from "./src/infrastracture/navigation/index";
import * as Notifications from "expo-notifications";
import {
  useFonts,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { AccountProvider } from "./src/services/account/account.context";
import { NotificationProvider } from "./src/hooks/NotificationContext";

// Font tanımı
const customFonts = {
  PP_Regular: Poppins_400Regular,
};

// 🔔 Notification handler (taşındı)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function App() {
  const [fontsLoaded] = useFonts(customFonts);

  if (!fontsLoaded) {
    return null; // Fontlar yüklenmeden uygulama render edilmesin
  }

  return (
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <AccountProvider>
          <Navigation />
          <StatusBar translucent />
        </AccountProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}
