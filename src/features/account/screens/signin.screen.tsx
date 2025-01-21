
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Pressable, TextInput, StyleSheet, View, Text, Dimensions } from 'react-native';

import { IUser } from "types";
import { loginUser } from '@src/services/account/account.service';
import { useNavigation } from '@react-navigation/native';
import navigation from '@src/infrastracture/navigation';
import { AuthScreenNavigationType } from '@src/infrastracture/navigation/types';
import { ButtonText, CustomButton } from '@src/features/account/components/acoount.styled'; // Doğru dosya yolunu kontrol edin
import { MainContainer, SafeArea } from '@src/components/main.style';
import { KeyboardCloser } from '@src/components/keyboard-closer.component';
import { theme } from '@src/theme';
import { Header } from '../components/header.component';
import { Title } from '../components/title.component';






const SignInScreen = () => {

    const [keyboardActive, setKeyboardActive] = useState(false);

    const handleRegister = () => {
        console.log("Kayıt ol butonuna basıldı.");
    };

    const navigation = useNavigation<AuthScreenNavigationType<"SignIn">>();
    const navBack = () => {
        navigation.goBack();
    };

    return (


        <SafeArea edges={["top"]} color={theme.colors.white}>
            <MainContainer color={"#D8D0D0"}>
                <KeyboardCloser isEnabled>
                    {!keyboardActive && <Title />}

                    <Header title="Giriş Yap" subtitle="Hatalarını kolayca çöz" />
                </KeyboardCloser>
            </MainContainer>
        </SafeArea>
    );
};

export default SignInScreen;
