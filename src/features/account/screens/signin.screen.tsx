
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Pressable, TextInput, StyleSheet, View, Text, Dimensions } from 'react-native';

import { IUser } from "types";
import Input, { Box } from "src/theme";
import Button from "src/theme";
import { loginUser } from '@src/services/account/account.service';




const SignInScreen = () => {

    /*
    const { updateUser } = useGlobalStore();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Omit<IUser, "name">>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: Omit<IUser, "name">) => {
        try {
            const { email, password } = data;

            const _user = await loginUser({
                email: email.toLowerCase(),
                password: password,
                image: null, // image alanını ekleyin
            });

            console.log("Login response:", _user);

            updateUser({
                email: _user.email,
                name: _user.name,
                _id: _user._id, // _id'yi ekleyin
                positionTitle: _user.positionTitle, // positionTitle'ı ekleyin
                image: _user.image || null, // image ekleyin (varsayılan olarak null)
            });

            router.replace('/auth/(tabs)/home');
        } catch (error) {
            console.log("Error logging in user:", error);
        }
    };
*/
    return (
        /*
                <Box flex={1} px="5.5" bg="zinc400">
                    <Box flexDirection="row">
        
                        <Text mt="3" ml="5" variant="textXl" fontWeight="700">
                            tekrar hos geldiniz
                        </Text>
                    </Box>
                    <Box p="10" />
                    <Controller
                        control={control}
                        name="email"
                        rules={{ required: { value: true, message: 'Email is required' } }}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <Input
                                label="Email"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={error}
                            />
                        )}
                    />
                    <Box mb='6' />
                    <Controller
                        control={control}
                        name="password"
                        rules={{ required: { value: true, message: 'Password is required' } }}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <Input
                                label="Password"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={error}
                                secureTextEntry
                            />
                        )}
                    />
                    <Box mt='5.5' />
                    <Pressable onPress={() => router.push('/welcome')}>
                        <Text color="red500" textAlign='right'>
                            Kayıt?
                        </Text>
                    </Pressable>
                    <Box mt="12" ml="10">
                        <Button label='Giriş Yap' onPress={handleSubmit(onSubmit)} uppercase />
                    </Box>
                </Box>
        */
        <View style={{ marginTop: 100, backgroundColor: "red" }}>
            <Text style={{ borderColor: "red", fontSize: 20 }}>
                {"sign in screen"}
            </Text>
        </View>


    );
};

export default SignInScreen;