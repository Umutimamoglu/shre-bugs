import React, { useContext, useEffect } from "react";
import { AccountContext } from "../../services/account/account.context";
import { NavigationContainer } from "@react-navigation/native";
import AppStackNavigator from "./app-stack-navigator";
import AuthStackNavigator from "./auth-stack-navigator";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Navigation = () => {
    const { user, isLoading } = useContext(AccountContext);



    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#A5616C" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? <AppStackNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    );
};


export default Navigation;