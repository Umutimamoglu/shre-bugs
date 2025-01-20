
import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';

import { Pressable, Alert, TextInput, StyleSheet, View, Text, Dimensions } from 'react-native';

import { Controller, useForm } from 'react-hook-form';

import { IUser } from 'types';
import { AuthScreenNavigationType } from '@src/infrastracture/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { AccountContext } from '@src/services/account/account.context';



const SingUpScreen = () => {
    const [email, setEmail] = useState<string>(""); // Email için başlangıç değeri boş string
    const [password, setPassword] = useState<string>(""); // Şifre için başlangıç değeri boş string
    const [name, setName] = useState<string>(""); // İsim için başlangıç değeri boş string
    const [image, setImage] = useState<string | null>(null); // Görsel için başlangıç değeri null
    const [positionTitle, setPositionTitle] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { isLoading, error, setError, register } = useContext(AccountContext);

    const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>();
    const navigateToSignInScreen = () => {
        navigation.navigate("SignIn");
    };
    const handleRegister = () => {
        if (
            email.length < 6 ||
            email.indexOf("@") === -1 ||
            email.indexOf(".") === -1
        ) {
            Alert.alert("Uyarı", "E-posta adresi geçersiz.", [{ text: "Tamam" }]);
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Uyarı", "Parolalar eşleşmiyor.", [{ text: "Tamam" }]);
            return;
        }
        if (password.length < 6 || password.length > 18) {
            Alert.alert("Uyarı", "Parola en az 6, en fazla 18 karakter olmalıdır.", [
                { text: "Tamam" },
            ]);
            return;
        }
        register(email, password, name, image, positionTitle);
    };



    return (
        <View style={{ flex: 1, paddingHorizontal: 22, marginTop: 60, backgroundColor: "#D8D0D0" }}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ marginLeft: 52, justifyContent: "center" }}>
                    <Text style={{ fontSize: 17, fontWeight: 500 }}>
                        Set Up your account
                    </Text>
                </View>
            </View>

            <View style={{ marginBottom: 24 }} />

            <TextInput
                style={{ width: 200, height: 40, backgroundColor: "#f3f3f3" }}
                onChangeText={setName}
                value={name}
                placeholder="name"
                keyboardType="numeric"
            />

            <View style={{ marginBottom: 24 }} />


            <TextInput
                style={{ width: 200, height: 40, backgroundColor: "#f3f3f3" }}
                onChangeText={setEmail}
                value={email}
                placeholder="useless placeholder"
                keyboardType="numeric"
            />



            <View style={{ marginBottom: 24 }} />

            <TextInput
                style={{ width: 200, height: 40, backgroundColor: "#f3f3f3" }}
                onChangeText={setPassword}
                value={password}
                placeholder="useless placeholder"
                keyboardType="numeric"
            />



            <View style={{ marginTop: 22 }} />

            <Pressable onPress={navigateToSignInScreen}>
                <Text style={{ textAlign: 'center', color: "#ef4444" }}>
                    Zaten bir hesabınız var mı?
                </Text>
            </Pressable>

            <Pressable
                onPress={handleRegister}
                style={{
                    backgroundColor: '#ef4444',
                    marginTop: 48,
                    marginLeft: 40,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                }}
            >
                <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
                    Kayıt Ol
                </Text>
            </Pressable>
        </View>
    );
};

export default SingUpScreen;
