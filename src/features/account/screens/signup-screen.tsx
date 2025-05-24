import React, { useContext, useEffect, useState } from 'react';
import { Pressable, TextInput, View, Text, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardCloser } from "@src/components/keyboard-closer.component";
import { AuthScreenNavigationType } from '@src/infrastracture/navigation/types';
import { AccountContext } from '@src/services/account/account.context';
import { BottomContainer, ButtonText, CustomButton, InputsContainer, TopContainer } from '../components/acoount.styled';
import { MainContainer, SafeArea } from '@src/components/main.style';
import { theme } from '@src/theme';
import { Title } from '../components/title.component';
import { Header } from '../components/header.component';
import { z } from 'zod';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormData } from 'types';


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

    const { isLoading, error, setError, register } = useContext(AccountContext);
    const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>();

    const handleRegister = async (formData: SignUpFormData) => {
        // image alanı zorunlu değilse veya ileride dosya upload için ekleyeceksen ekle
        await register(
            formData.email,
            formData.password,
            formData.name,
            null,
            formData.positionTitle
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
                                <TextInput
                                    style={{
                                        width: 300,
                                        height: 44,
                                        backgroundColor: "#FAFAFA",
                                        borderRadius: 10,
                                        marginTop: 5,
                                        marginBottom: 5,
                                        paddingHorizontal: 10,
                                        borderWidth: 2,
                                        borderColor: "#ccc",
                                    }}
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
                                <TextInput
                                    style={{
                                        width: 300,
                                        height: 44,
                                        backgroundColor: "#FAFAFA",
                                        borderRadius: 10,
                                        marginTop: 5,
                                        marginBottom: 5,
                                        paddingHorizontal: 10,
                                        borderWidth: 2,
                                        borderColor: "#ccc",
                                    }}
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
                                <TextInput
                                    style={{
                                        width: 300,
                                        height: 44,
                                        backgroundColor: "#FAFAFA",
                                        borderRadius: 10,
                                        marginTop: 5,
                                        marginBottom: 5,
                                        paddingHorizontal: 10,
                                        borderWidth: 2,
                                        borderColor: "#ccc",
                                    }}
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
                                <TextInput
                                    style={{
                                        width: 300,
                                        height: 44,
                                        backgroundColor: "#FAFAFA",
                                        borderRadius: 10,
                                        marginTop: 5,
                                        marginBottom: 5,
                                        paddingHorizontal: 10,
                                        borderWidth: 2,
                                        borderColor: "#ccc",
                                    }}
                                    placeholder="Şifre"
                                    onChangeText={onChange}
                                    value={value}
                                    onBlur={onBlur}
                                    secureTextEntry={true}
                                />
                            )}
                        />



                        <Controller
                            control={control}
                            name="confirmPassword"
                            render={({ field: { onChange, value, onBlur } }) => (
                                <TextInput
                                    style={{
                                        width: 300,
                                        height: 44,
                                        backgroundColor: "#FAFAFA",
                                        borderRadius: 10,
                                        marginTop: 5,
                                        marginBottom: 5,
                                        paddingHorizontal: 10,
                                        borderWidth: 2,
                                        borderColor: "#ccc",
                                    }}
                                    placeholder="Şifre Tekrar"
                                    onChangeText={onChange}
                                    value={value}
                                    onBlur={onBlur}
                                    secureTextEntry={true}
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