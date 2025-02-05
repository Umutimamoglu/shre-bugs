import React, { useContext, useEffect, useState } from 'react';
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

const SignInScreen = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [keyboardActive, setKeyboardActive] = useState(false);

    const navigation = useNavigation<AuthScreenNavigationType<'SignIn'>>();
    const { login } = useContext(AccountContext);

    const navBack = () => {
        navigation.goBack();
    };

    const handleSignIn = () => {
        if (!email.includes('@') || !email.includes('.')) {
            Alert.alert('Uyarı', 'E-posta adresi geçersiz.', [{ text: 'Tamam' }]);
            return;
        }

        if (password.length < 6 || password.length > 18) {
            Alert.alert('Uyarı', 'Parola en az 6, en fazla 18 karakter olmalıdır.', [{ text: 'Tamam' }]);
            return;
        }

        login(email, password).catch((err) => {
            console.error('Kullanıcı kaydedilemedi:', err);
            Alert.alert('Hata', 'Kullanıcı kayıt işlemi sırasında bir hata oluştu.');
        });
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
        <SafeArea edges={['top']} color={theme.colors.brand.primary}>
            <MainContainer color={theme.colors.brand.primary}>
                <KeyboardCloser isEnabled>
                    {!keyboardActive && <Title />}
                    <Header title="Giriş Yap" subtitle="Hatalarını kolayca çöz" />
                    <InputsContainer>
                        <TextInput
                            style={{
                                width: 200,
                                height: 40,
                                backgroundColor: theme.colors.ui.secondary,
                                borderRadius: 10,
                                marginVertical: 5,
                                paddingHorizontal: 10,
                            }}
                            onChangeText={setEmail}
                            value={email}
                            placeholder="E-posta adresinizi girin"
                            keyboardType="email-address"
                        />
                        <TextInput
                            style={{
                                width: 200,
                                height: 40,
                                backgroundColor: theme.colors.ui.secondary,
                                borderRadius: 10,
                                marginVertical: 5,
                                paddingHorizontal: 10,
                            }}
                            onChangeText={setPassword}
                            value={password}
                            placeholder="Şifrenizi girin"
                            secureTextEntry
                        />
                    </InputsContainer>
                    <BottomContainer>
                        <Pressable onPress={navBack}>
                            <Text style={{ textAlign: 'center', color: theme.colors.brand.secondary }}>
                                Yeni bir hesap oluşturmak için
                            </Text>
                        </Pressable>
                        <CustomButton
                            onPress={handleSignIn}
                            style={{
                                backgroundColor: theme.colors.brand.secondary,
                                marginTop: 15,
                            }}
                        >
                            <ButtonText>Giriş Yap</ButtonText>
                        </CustomButton>
                    </BottomContainer>
                </KeyboardCloser>
            </MainContainer>
        </SafeArea>
    );
};

export default SignInScreen;