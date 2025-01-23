import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, View, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const NavigateBack = () => {
    const navigation = useNavigation();

    const navigateBack = () => {
        navigation.goBack();
    };

    return (
        <Pressable onPress={navigateBack}>
            <View style={styles.container}>
                <AntDesign name="arrowleft" size={24} color="black" />
            </View>
        </Pressable>
    );
};

export default NavigateBack;

const styles = StyleSheet.create({
    container: {
        marginTop: 8,    // Box mt="2" varsayılan olarak ~8 px olabilir
        marginLeft: 12,  // Box ml="3" varsayılan olarak ~12 px olabilir
        marginBottom: 8, // Box mb="2" varsayılan olarak ~8 px olabilir
    },
});
