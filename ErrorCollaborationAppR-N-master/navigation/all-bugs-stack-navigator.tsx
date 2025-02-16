import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AllBugsStackParamList, BugsStackParamList } from "./types";

import React from "react";

import AllBugDetail from "../screens/AllBugDetail";
import FeedScreen from "../screens/FeedScreen";
import ChatScreen from "../screens/ChatScreen";
import FavoriBugs from "../screens/FavoriBugs";
import FavoriBugsScreen from "../screens/FavoriBugs";
import FavoriBugDettailScreen from "../screens/FavoriBugDetailScreen";

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

            <Stack.Screen
                name="AllBugDetail"
                component={AllBugDetail}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="FavoriBugs"
                component={FavoriBugsScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="FavoriBugDettail"
                component={FavoriBugDettailScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};

export default AllBugsStackNavigator;
