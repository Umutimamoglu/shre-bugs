import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@shopify/restyle";
import HomeStackNavigator from "./home-stack-navigator";
import Icons from "@src/heplers/shared/icons";


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
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
