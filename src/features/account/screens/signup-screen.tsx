import React, { useContext, useEffect, useState } from 'react';
import { Pressable, TextInput, View, Text, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardCloser } from "@src/components/keyboard-closer.component";
import { AuthScreenNavigationType } from '@src/infrastracture/navigation/types';
import { AccountContext } from '@src/services/account/account.context';
import { BottomContainer, ButtonText, CustomButton, InputsContainer, TopContainer } from '../components/acoount.styled';
import { MainContainer, SafeArea, StyledInput } from '@src/components/main.style';
import { theme } from '@src/theme';
import { Title } from '../components/title.component';
import { Header } from '../components/header.component';
import { z } from 'zod';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormData } from 'types';
import AsyncStorage from '@react-native-async-storage/async-storage';


const signUpSchema = z.object({
    name: z.string().min(2, "Adınız çok kısa"),
    email: z.string().email("Geçersiz e-posta"),
    password: z.string().min(6, "En az 6 karakter").max(18, "En fazla 18 karakter"),
    confirmPassword: z.string(),
    positionTitle: z.string().min(2, "Pozisyon gerekli")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Parolalar eşleşmiyor.",
    path: ["confirmPassword"]
});

const SignUpScreen = () => {
    const [keyboardActive, setKeyboardActive] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            positionTitle: "",
        },
    });
    const pushNotificationToken = AsyncStorage.getItem("sahrebugsStoken");
    const { isLoading, error, setError, register } = useContext(AccountContext);
    const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>();

    const handleRegister = async (formData: SignUpFormData) => {
        const pushNotificationToken = await AsyncStorage.getItem("sahrebugsStoken");

        await register(
            formData.email,
            formData.password,
            formData.name,
            null,                           // image
            formData.positionTitle,
            "0",                            // fixedBugsCount varsayılan
            "Unknown",
            "Unknown",
            pushNotificationToken || ''
        );
    };

    const navigateToSignInScreen = () => {
        navigation.navigate("SignIn");
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            () => {
                console.log("KLAVYE AÇILDI");
                setKeyboardActive(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            () => {
                console.log("KLAVYE KAPANDI");
                setKeyboardActive(false);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <SafeArea edges={["top"]} color={theme.colors.ui.tertiary3}>
            <MainContainer color={theme.colors.ui.tertiary3}>
                <KeyboardCloser isEnabled>

                    <InputsContainer>
                        {!keyboardActive && <Title />}

                        <Header title="Kayıt Ol" subtitle="Hatalarını kolayca çöz" />

                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { onChange, value, onBlur } }) => (
                                <StyledInput
                                    placeholder="Ad Soyad"
                                    onChangeText={onChange}
                                    value={value}
                                    onBlur={onBlur}
                                    autoCapitalize="none"
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="positionTitle"
                            render={({ field: { onChange, value, onBlur } }) => (
                                <StyledInput
                                    placeholder="Pozisyon"
                                    onChangeText={onChange}
                                    value={value}
                                    onBlur={onBlur}
                                    autoCapitalize="words"
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, value, onBlur } }) => (
                                <StyledInput
                                    placeholder="E-Posta"
                                    onChangeText={onChange}
                                    value={value}
                                    onBlur={onBlur}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, value, onBlur } }) => (
                                <StyledInput
                                    placeholder="Şifre"
                                    onChangeText={onChange}
                                    value={value}
                                    onBlur={onBlur}
                                    secureTextEntry
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="confirmPassword"
                            render={({ field: { onChange, value, onBlur } }) => (
                                <StyledInput
                                    placeholder="Şifre Tekrar"
                                    onChangeText={onChange}
                                    value={value}
                                    onBlur={onBlur}
                                    secureTextEntry
                                />
                            )}
                        />

                        {errors.confirmPassword && <Text style={{ color: 'red' }}>{errors.confirmPassword.message}</Text>}

                        <Pressable onPress={navigateToSignInScreen}>
                            <Text style={{ textAlign: "center", color: '#007AFF' }}>
                                Zaten bir hesabınız var mı?
                            </Text>
                        </Pressable>
                        <CustomButton
                            onPress={handleSubmit(handleRegister)}
                            style={{
                                backgroundColor: "#007AFF",
                                marginTop: 15,
                            }}
                            disabled={isLoading}
                        >
                            <ButtonText>Kayıt Ol</ButtonText>
                        </CustomButton>
                        {error && (
                            <Text style={{ color: 'red', marginTop: 10, textAlign: 'center' }}>{error}</Text>
                        )}
                    </InputsContainer>


                </KeyboardCloser>
            </MainContainer>
        </SafeArea>
    );
};

export default SignUpScreen;