import React from 'react';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationType } from '../../navigation/types';
import useUserGlobalStore from '../../store/useUserGlobalStore';
import { Controller, useForm } from 'react-hook-form';
import { IUser } from '../../types';
import { loginUser } from '../../service/api';
import SafeAreaWraper from '../../src/shared/safe-area-wrapper';
import { Box, Text } from '../../utils/theme';
import Input from '../../src/shared/input';
import Button from '../../src/shared/button';
import NavigateBack from '../../src/shared/navigate-back';

const SignInScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"SignIn">>();
    const { updateUser } = useUserGlobalStore();

    const {
        control,
        handleSubmit,
        setError,
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
            console.log('Login data:', { email, password });


            const user = await loginUser({
                email: email.toLowerCase(),
                password: password,
            });

            console.log("Login response:", user);


            updateUser({
                _id: user._id,
                email: user.email,
                name: user.name,
                image: user.image,
                positionTitle: user.positionTitle
            });

        } catch (error: unknown) {

            console.error("Login error:", error);
            setError('email', { type: 'manual', message: 'Giriş başarısız oldu' });
        }
    };

    const navigateToSignUpScreen = () => {
        navigation.navigate("SignUp");
    };

    return (
        <SafeAreaWraper>
            <Box flex={1} px="5.5" bg="zinc400">
                <Box flexDirection="row">
                    <NavigateBack />
                    <Text mt="3" ml="5" variant="textXl" fontWeight="700">
                        tekrar hoş geldiniz
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
                <Pressable onPress={navigateToSignUpScreen}>
                    <Text color="red500" textAlign='right'>
                        Kayıt?
                    </Text>
                </Pressable>
                <Box mt="12" ml="10">
                    <Button label='Giriş Yap' onPress={handleSubmit(onSubmit)} uppercase />
                </Box>
            </Box>
        </SafeAreaWraper>
    );
};

export default SignInScreen;