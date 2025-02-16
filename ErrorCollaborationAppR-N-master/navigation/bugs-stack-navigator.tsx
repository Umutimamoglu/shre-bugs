import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BugsStackParamList } from "./types";
import MyBugsScreen from "../screens/MyBugsScreen";
import React from "react";
import BugDetailScreen from "../screens/BugDetailScreen";
import AllBugDetail from "../screens/AllBugDetail";

const Stack = createNativeStackNavigator<BugsStackParamList>();

const BugsStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Bugs"
                component={MyBugsScreen}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen
                name="BugDetail"
                component={BugDetailScreen}
                options={{
                    headerShown: false,
                }}
            />

        </Stack.Navigator>
    );
};

export default BugsStackNavigator;
