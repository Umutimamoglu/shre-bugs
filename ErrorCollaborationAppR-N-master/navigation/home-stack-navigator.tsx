import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import HomeScreen from "../screens/home-screen"
import { HomeStackParamlist } from "./types"



const Stack = createNativeStackNavigator<HomeStackParamlist>()

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, }} />
        </Stack.Navigator>
    )
}

export default HomeStackNavigator