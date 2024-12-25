
import React from 'react';

import axios from 'axios';

import { Pressable, Alert, TextInput, StyleSheet, View, Text, Dimensions } from 'react-native';

import { Controller, useForm } from 'react-hook-form';

import { IUser } from 'types';
import { AuthScreenNavigationType } from '@src/infrastracture/navigation/types';
import { useNavigation } from '@react-navigation/native';



const SingUpScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>();
    const navigateToSignInScreen = () => {
        navigation.navigate("SignIn");
    };
    const { control, handleSubmit, formState: { errors }, watch } = useForm<IUser>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });
    const onSubmit = async (data: IUser) => {
        try {
            // Kullanıcının girdiği verileri logla
            console.log('Form Input Values:', {
                name: watch('name'),
                email: watch('email'),
                password: watch('password'),
            });

            const { email, name, password } = data;

            // Backend'e gönderilmeye çalışılan veriyi logla
            console.log('Payload sent to backend:', { email, name, password });

            // Kullanıcıyı backend'e kaydet
            //await registerUser({ email, name, password });

            // Başarılı olursa giriş ekranına yönlendir
            console.log('Registration successful! Redirecting to login...');
            navigateToSignInScreen
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error in onSubmit:', error.response?.data || error.message);
                Alert.alert('Hata', error.response?.data?.message || 'Bir hata oluştu.');
            } else {
                console.error('Unexpected error in onSubmit:', error);
                Alert.alert('Hata', 'Beklenmeyen bir hata oluştu.');
            }
        }
    };


    return (
        <View style={{ flex: 1, paddingHorizontal: 22, backgroundColor: "#D8D0D0" }}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ marginLeft: 52, justifyContent: "center" }}>
                    <Text style={{ fontSize: 17, fontWeight: 500 }}>
                        Set Up your account
                    </Text>
                </View>
            </View>

            <View style={{ marginBottom: 24 }} />

            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder='Name'
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                rules={{ required: 'Name is required' }}
            />

            <View style={{ marginBottom: 24 }} />

            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder='Email'
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                rules={{ required: 'Email is required' }}
            />

            <View style={{ marginBottom: 24 }} />

            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder='password'
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry
                    />
                )}
                rules={{ required: 'Password is required' }}
            />

            <View style={{ marginTop: 22 }} />

            <Pressable onPress={navigateToSignInScreen}>
                <Text style={{ textAlign: 'center', color: "#ef4444" }}>
                    Zaten bir hesabınız var mı?
                </Text>
            </Pressable>

            <Pressable
                onPress={handleSubmit(onSubmit)}
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
