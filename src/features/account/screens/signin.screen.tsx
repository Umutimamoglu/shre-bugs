
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Pressable, TextInput, StyleSheet, View, Text, Dimensions } from 'react-native';

import { IUser } from "types";
import { loginUser } from '@src/services/account/account.service';
import { useNavigation } from '@react-navigation/native';
import navigation from '@src/infrastracture/navigation';
import { AuthScreenNavigationType } from '@src/infrastracture/navigation/types';
import { ButtonText, CustomButton } from '@src/features/account/components/acoount.styled'; // Doğru dosya yolunu kontrol edin






const SignInScreen = () => {
    const handleRegister = () => {
        console.log("Kayıt ol butonuna basıldı.");
    };

    const navigation = useNavigation<AuthScreenNavigationType<"SignIn">>();
    const navBack = () => {
        navigation.goBack();
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <CustomButton
                onPress={navBack}
            >
                <ButtonText textColor="#FFF">Kayıt Ol</ButtonText>
            </CustomButton>
        </View >
    );
};

export default SignInScreen;
