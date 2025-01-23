import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeStackNavigator from "./home-stack-navigator";
import { MaterialIcons } from "@expo/vector-icons";
import BugsStackNavigator from "./bugs-stack-navigator";
import ProfileScreen from "@src/features/profilescreen/screens/profilescreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AllBugsStackNavigator from "./all-bugs-stack-navigator";
import { theme } from "@src/theme";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "gray",
                tabBarHideOnKeyboard: true,

                headerShown: false,


            })}
        >
            {/* Home Tab */}
            <Tab.Screen
                name="Home"
                component={HomeStackNavigator}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialIcons
                            name="home"
                            size={focused ? 28 : 24} // Aktifken daha büyük göster
                            color={focused ? "#CCC68E" : color} // Aktifken özel renk
                        />
                    ),
                }}
            />



            {/* MyBugs Tab */}
            <Tab.Screen
                name="MyBugs"
                component={BugsStackNavigator}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialIcons
                            name="error-outline"
                            size={focused ? 28 : 24} // Aktifken daha büyük göster
                            color={focused ? "#CCC68E" : color} // Aktifken özel renk
                        />
                    ),
                }}
            />
            {/* Feed Tab */}
            <Tab.Screen
                name="Feed"
                component={AllBugsStackNavigator}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialIcons
                            name="rss-feed"
                            size={focused ? 28 : 24} // Aktifken daha büyük göster
                            color={focused ? "#CCC68E" : color} // Aktifken özel renk
                        />
                    ),
                }}
            />
            {/* Profile Tab */}
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <FontAwesomeIcon
                            icon={faUser}
                            size={focused ? 28 : 24} // Aktifken daha büyük göster
                            color={focused ? "#CCC68E" : color} // Aktifken özel renk
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
