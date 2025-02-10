import React from 'react'; // React'ı import edin
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from './bottom-tab-navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BugProvider } from '@src/services/bugs/bugs.context';
import { ChatProvider } from '@src/services/chat/chat.context';



const Stack = createNativeStackNavigator()

const AppStackNavigator = () => {
    return (
        <SafeAreaProvider>
            <BugProvider>
                <ChatProvider>


                    <Stack.Navigator>
                        <Stack.Screen name="Root" component={BottomTabNavigator}
                            options={{
                                headerShown: false,
                            }}

                        />
                    </Stack.Navigator>
                </ChatProvider>
            </BugProvider>
        </SafeAreaProvider>
    )
}

export default AppStackNavigator;