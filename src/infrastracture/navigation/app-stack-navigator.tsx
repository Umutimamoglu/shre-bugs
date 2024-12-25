import React from 'react'; // React'ı import edin
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from './bottom-tab-navigator';


const Stack = createNativeStackNavigator()

const AppStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator}
                options={{
                    headerShown: false,
                }}

            />
        </Stack.Navigator>
    )
}

export default AppStackNavigator;