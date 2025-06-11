
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";



import { Pressable, TextInput, StyleSheet, View, Text, Dimensions, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationType } from '@src/infrastracture/navigation/types';

const WelcomeScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"Welcome">>();
    const navigateToSignUpScreen = () => {
        navigation.navigate("SignIn");
    };

    return (
        <SafeAreaView>
            <View style={{ flex: 1 }}>


                <View style={{ flex: 1, backgroundColor: "#F34147" }}>
                    <View style={{ marginTop: 13, alignItems: 'center' }}>
                        <MaterialIcons align name="error-outline" size={120} color="white" />
                    </View>

                    <View
                        style={{
                            borderRadius: 30, // rounded-7xl yerine direkt 30 veriyorum
                            marginTop: 180,
                            width: 395,
                            height: 500,
                            backgroundColor: "#D8D0D0", // zinc400 renk koduna göre
                        }}
                    >
                        <View style={{ flex: 6, marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.title}>
                                Let Fix in Your
                            </Text>
                            <Text style={styles.title}>
                                Bug’s
                            </Text>
                            <View>
                                <AntDesign name="check" size={30} color="green" />
                            </View>
                            <View>
                                <Button
                                    title="Go"
                                    color="#841584"
                                    onPress={navigateToSignUpScreen}
                                />
                            </View>
                        </View>


                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({

    title: {
        shadowOpacity: 0.2,
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 16,
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;



