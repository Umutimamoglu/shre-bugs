import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AllBugsStackParamList, BugsStackParamList } from "./types";

import React from "react";
import FeedScreen from "@src/features/allbugfeed/screens/feedscreen";


const Stack = createNativeStackNavigator<AllBugsStackParamList>();

const AllBugsStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AllBugs"
                component={FeedScreen}
                options={{
                    headerShown: false,
                }} />

        </Stack.Navigator>
    );
};

export default AllBugsStackNavigator;
