import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AllBugsStackParamList, BugsStackParamList } from "./types";

import React from "react";
import FeedScreen from "@src/features/allbugfeed/screens/feedscreen";
import AllBugDetail from "@src/features/allbugfeed/screens/allbugdetail";
import ChatScreen from "@src/features/chat/screen/chatscreen";
import FavoriBugsScreen from "@src/features/favoribugs/screens/favoribugs";
import FavoriBugDettailScreen from "@src/features/favoribugs/screens/favoribugdetail";


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
