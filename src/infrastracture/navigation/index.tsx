import React, { useContext, useEffect } from "react";
import { AccountContext } from "../../services/account/account.context";
import { NavigationContainer } from "@react-navigation/native";
import AppStackNavigator from "./app-stack-navigator";
import AuthStackNavigator from "./auth-stack-navigator";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NotificationProvider } from "@src/hooks/NotificationContext";
import * as Notifications from 'expo-notifications';
export const Navigation = () => {
    const { user, isLoading } = useContext(AccountContext);


    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: true,
            shouldSetBadge: true,
            shouldShowBanner: true,
            shouldShowList: true,
        }),
    });


    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#A5616C" />
            </View>
        );
    }

    return (
        <NotificationProvider>


            <NavigationContainer>
                {user ? <AppStackNavigator /> : <AuthStackNavigator />}
            </NavigationContainer>
        </NotificationProvider>
    );
};


export default Navigation;