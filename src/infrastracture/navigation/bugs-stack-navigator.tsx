import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BugsStackParamList } from "./types";

import React from "react";
import MyBugsScreen from "@src/features/mybugs/screens/mybugscreen";
import BugDetailScreen from "@src/features/mybugs/screens/bugdetailscreen";



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
