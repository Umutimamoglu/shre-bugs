import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "@src/features/home/home.screen"
import React from "react"





const Stack = createNativeStackNavigator()

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, }} />
        </Stack.Navigator>
    )
}

export default HomeStackNavigator