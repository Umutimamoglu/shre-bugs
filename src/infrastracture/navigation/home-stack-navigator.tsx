import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "@src/features/home/screens/home.screen"
import React from "react"





const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default HomeStackNavigator;
