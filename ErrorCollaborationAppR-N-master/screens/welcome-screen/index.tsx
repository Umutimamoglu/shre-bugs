import { View, Dimensions, StyleSheet, Text } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import SafeAreaWraper from '../../src/shared/safe-area-wrapper';
import Button from '../../src/shared/button';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationType } from '../../navigation/types';
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window'); // Ekran boyutlarını alıyoruz

const WelcomeScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"Welcome">>();
    const navigateToSignUpScreen = () => {
        navigation.navigate("SignUp");
    };

    return (
        <SafeAreaWraper>
            <View style={[styles.container, { backgroundColor: '#ef4444' }]}>
                <View style={[styles.iconContainer, { marginTop: height * 0.05 }]}>
                    <MaterialIcons name="error-outline" size={120} color="white" />
                </View>

                <View
                    style={[
                        styles.box,
                        {
                            marginTop: height * 0.13,
                            width: width * 1, // Genişliği ekranın %90'ı olacak şekilde ayarlıyoruz
                            height: height * 0.8, // Yüksekliği ekranın %60'ı olacak şekilde ayarlıyoruz
                            backgroundColor: '#D8D0D0', // zinc400 rengi
                            borderRadius: 28, // rounded-7xl için
                        },
                    ]}
                >
                    <View style={[styles.textContainer, { marginTop: height * 0.1 }, { justifyContent: 'center' }]}>
                        <Text style={styles.text}>
                            Let Fix in Your
                        </Text>
                        <Text style={styles.text}>
                            Bug’s
                        </Text>
                        <AntDesign name="check" size={30} color="green" />
                    </View>
                    <View style={[styles.buttonContainer, { marginTop: height * 0.03 }]}>
                        <Button label='Başla' onPress={navigateToSignUpScreen} />
                    </View>
                </View>
            </View>
        </SafeAreaWraper>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    iconContainer: {
        alignItems: 'center',
    },
    box: {
        alignItems: 'center',
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
    },
    buttonContainer: {
        alignItems: 'center',
    },
});

export default WelcomeScreen;