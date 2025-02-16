
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { AuthStackParamList } from "./types"
import SignInScreen from "../screens/sign-in-screen"
import WelcomeScreen from "../screens/welcome-screen"
import SingUpScreen from "../screens/sign-up-screen"


const Stack = createNativeStackNavigator<AuthStackParamList>()

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                options={{
                    headerShown: false
                }}
                component={WelcomeScreen}
            />
            <Stack.Screen
                name="SignIn"
                options={{
                    headerShown: false
                }}
                component={SignInScreen}
            />
            <Stack.Screen
                name="SignUp"
                options={{
                    headerShown: false
                }}
                component={SingUpScreen}
            />

        </Stack.Navigator>
    )
}
export default AuthStackNavigator