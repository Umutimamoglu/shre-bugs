import React, { useContext } from "react";
import { AccountContext } from "../../services/account/account.context"
import { NavigationContainer } from "@react-navigation/native";
import AppStackNavigator from "./app-stack-navigator";
import AuthStackNavigator from "./auth-stack-navigator";

export const Navigation = () => {
    if (!AccountContext) {
        throw new Error("AccountContext must be used within an AccountProvider");
    }

    const { user, isLoading,
        error, } = useContext(AccountContext);
    console.log("user bilgsi : ", user, isLoading,
        error);

    return (
        <NavigationContainer>
            {user ? <AppStackNavigator /> : <AuthStackNavigator />}


        </NavigationContainer>
    );
};
export default Navigation;