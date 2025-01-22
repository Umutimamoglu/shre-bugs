import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@shopify/restyle";
import HomeStackNavigator from "./home-stack-navigator";
import Icons from "@src/heplers/shared/icons";
import AllBugsStackNavigator from "./all-bugs-stack-navigator";
import { MaterialIcons } from '@expo/vector-icons';
import BugsStackNavigator from "./bugs-stack-navigator";
import ProfileScreen from "@src/features/profilescreen/screens/profilescreen";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    const theme = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "black", // Virgül eklendi
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    backgroundColor: theme.colors.zinc300, // Arka plan rengi burada ayarlanıyor
                    borderTopColor: "transparent", // Tab bar üst çizgisini kaldırmak için
                },
            }}
        >
            <Tab.Screen
                name="HomeStack"
                component={HomeStackNavigator}
                options={() => ({
                    title: "Home",
                    tabBarIcon: ({ color }) => <Icons name="home" color={color} />,
                    headerShown: false,
                })}
            />
            <Tab.Screen
                name="Feed"
                component={AllBugsStackNavigator}
                options={() => ({
                    title: "Feed",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="rss-feed" color={color} size={size} />
                    ),
                    headerShown: false,
                })}
            />
            <Tab.Screen
                name="MyBugs"
                component={BugsStackNavigator}
                options={() => ({
                    title: "Bugs",
                    tabBarIcon: ({ color }) => <MaterialIcons name="error-outline" size={24} color="black" />,
                    headerShown: false,
                })}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={() => ({
                    title: "Profile",
                    tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faUser} color={color} />,
                    headerShown: false,
                })}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
