
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { AuthStackParamList } from "./types"
import SignInScreen from "@src/features/account/screens/signin.screen"
import WelcomeScreen from "@src/features/account/screens/welcome.screen"
import SingUpScreen from "@src/features/account/screens/signup-screen"
import EmailVerificationScreen from "@src/features/account/screens/emailVerificationScreen"




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
                name="EmailVerificationScreen"
                options={{
                    headerShown: false
                }}
                component={EmailVerificationScreen}
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