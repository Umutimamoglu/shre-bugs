import React, { useContext, useEffect, useRef, useState } from 'react';
import { Pressable, TextInput, Alert, Keyboard, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationType } from '@src/infrastracture/navigation/types';
import { MainContainer, SafeArea } from '@src/components/main.style';
import { KeyboardCloser } from '@src/components/keyboard-closer.component';
import { theme } from '@src/theme';
import { Header } from '../components/header.component';
import { Title } from '../components/title.component';
import { AccountContext } from '@src/services/account/account.context';
import { BottomContainer, ButtonText, CustomButton, InputsContainer } from '@src/features/account/components/acoount.styled';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AsyncStorage from '@react-native-async-storage/async-storage';

const signInSchema = z.object({
    email: z.string().email('Geçersiz e-posta'),
    password: z.string().min(6, 'En az 6 karakter').max(18, 'En fazla 18 karakter')
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignInScreen = () => {
    const inputRef = useRef<TextInput>(null);

    const [keyboardActive, setKeyboardActive] = useState(false);
    const navigation = useNavigation<AuthScreenNavigationType<'SignIn'>>();
    const { login } = useContext(AccountContext);


    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: SignInFormData) => {
        const pushNotificationToken = await AsyncStorage.getItem("sahrebugsStoken");
        try {
            await login(data.email, data.password, pushNotificationToken || '');

        } catch (err) {
            console.error('Giriş hatası:', err);
            Alert.alert('Hata', 'Giriş işlemi sırasında bir hata oluştu.');
        }
    };

    const navBack = () => {
        navigation.navigate('EmailVerificationScreen')
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardActive(true));
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardActive(false));

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <SafeArea edges={['top']} color={theme.colors.ui.tertiary3}>
            <MainContainer color={theme.colors.ui.tertiary3}>
                <KeyboardCloser isEnabled>

                    <InputsContainer>
                        {!keyboardActive && <Title />}
                        <Header title="Giriş Yap" subtitle="Hatalarını kolayca çöz" />
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, value, onBlur } }) => (
                                <TextInput ref={inputRef}
                                    style={{
                                        width: 300,
                                        height: 44,
                                        backgroundColor: '#FAFAFA',
                                        borderRadius: 10,
                                        marginVertical: 5,
                                        paddingHorizontal: 10,
                                        borderWidth: 2,
                                        borderColor: '#ccc'
                                    }}
                                    placeholder="E-posta adresinizi girin"
                                    placeholderTextColor="#888"
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            )}
                        />
                        {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}

                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, value, onBlur } }) => (
                                <TextInput
                                    style={{
                                        width: 300,
                                        height: 44,
                                        backgroundColor: '#FAFAFA',
                                        borderRadius: 10,
                                        marginVertical: 5,
                                        paddingHorizontal: 10,
                                        borderWidth: 2,
                                        borderColor: '#ccc'
                                    }}
                                    placeholder="Şifrenizi girin"
                                    placeholderTextColor="#888"
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    secureTextEntry
                                />
                            )}
                        />
                        {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}

                        <Pressable onPress={navBack}>
                            <Text style={{ textAlign: 'center', color: '#007AFF' }}>
                                Yeni bir hesap oluşturmak için
                            </Text>
                        </Pressable>

                        <CustomButton
                            height="50px"
                            onPress={handleSubmit(onSubmit)}
                            style={{
                                backgroundColor: '#007AFF',
                                marginTop: 15,
                            }}
                        >
                            <ButtonText>Giriş Yap</ButtonText>
                        </CustomButton>
                    </InputsContainer>
                </KeyboardCloser>
            </MainContainer>
        </SafeArea>
    );
};

export default SignInScreen;
