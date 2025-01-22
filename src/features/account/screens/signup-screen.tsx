import React, { useContext, useEffect, useState } from 'react';
import { Pressable, Alert, TextInput, View, Text, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardCloser } from "@src/components/keyboard-closer.component";
import { AuthScreenNavigationType } from '@src/infrastracture/navigation/types';
import { AccountContext } from '@src/services/account/account.context';
import { BottomContainer, ButtonText, CustomButton, InputsContainer, TopContainer } from '../components/acoount.styled';
import { MainContainer, SafeArea } from '@src/components/main.style';
import { theme } from '@src/theme';
import { Title } from '../components/title.component';
import { Header } from '../components/header.component';

const SignUpScreen = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [image, setImage] = useState<string | null>(null);
    const [positionTitle, setPositionTitle] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [keyboardActive, setKeyboardActive] = useState(false);

    const { isLoading, error, setError, register } = useContext(AccountContext);
    const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>();

    const navigateToSignInScreen = () => {
        navigation.navigate("SignIn");
    };

    const handleRegister = () => {
        if (!email || !password || !name || !positionTitle || !confirmPassword) {
            console.log("Eksik alanlar:", {
                email: email || "Boş",
                password: password || "Boş",
                name: name || "Boş",
                positionTitle: positionTitle || "Boş",
                confirmPassword: confirmPassword || "Boş",
            });
            Alert.alert("Uyarı", "Tüm alanları doldurmanız gerekiyor.", [{ text: "Tamam" }]);
            return;
        }
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

        try {
            register(email, password, name, image, positionTitle);
            console.log("Kullanıcı başarıyla kaydedildi.");
        } catch (err) {
            console.error("Kullanıcı kaydedilemedi:", err);
            Alert.alert("Hata", "Kullanıcı kayıt işlemi sırasında bir hata oluştu.");
        }
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            () => setKeyboardActive(true)
        );
        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            () => setKeyboardActive(false)
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <SafeArea >
            <MainContainer color={"#D8D0D0"}>
                <KeyboardCloser isEnabled>
                    <TopContainer>
                        {!keyboardActive && <Title />}

                        <Header title="Kayıt Ol" subtitle="Hatalarını kolayca çöz" />

                        <InputsContainer >
                            <TextInput
                                style={{
                                    width: 200,
                                    height: 40,
                                    backgroundColor: "#f3f3f3",
                                    borderRadius: 10,
                                    marginTop: 5,
                                    marginBottom: 5,
                                    paddingHorizontal: 10,
                                }}
                                onChangeText={setName}
                                value={name}
                                placeholder="Enter your username"
                                keyboardType="default"
                            />
                            <TextInput
                                style={{
                                    width: 200,
                                    height: 40,
                                    backgroundColor: "#f3f3f3",
                                    borderRadius: 10,
                                    marginTop: 5,
                                    marginBottom: 5,
                                    paddingHorizontal: 10,
                                }}
                                onChangeText={setPositionTitle}
                                value={positionTitle}
                                placeholder="Position title"
                                keyboardType="default"
                                secureTextEntry={false}
                            />
                            <TextInput
                                style={{
                                    width: 200,
                                    height: 40,
                                    backgroundColor: "#f3f3f3",
                                    borderRadius: 10,
                                    marginTop: 5,
                                    marginBottom: 5,
                                    paddingHorizontal: 10,
                                }}
                                onChangeText={setEmail}
                                value={email}
                                placeholder="Enter your email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <TextInput
                                style={{
                                    width: 200,
                                    height: 40,
                                    backgroundColor: "#f3f3f3",
                                    borderRadius: 10,
                                    marginTop: 5,
                                    marginBottom: 5,
                                    paddingHorizontal: 10,
                                }}
                                onChangeText={setPassword}
                                value={password}
                                placeholder="Enter your password"
                                keyboardType="default"
                                secureTextEntry={true}
                            />
                            <TextInput
                                style={{
                                    width: 200,
                                    height: 40,
                                    backgroundColor: "#f3f3f3",
                                    borderRadius: 10,
                                    marginTop: 5,
                                    marginBottom: 5,
                                    paddingHorizontal: 10,
                                }}
                                onChangeText={setConfirmPassword}
                                value={confirmPassword}
                                placeholder="Confirm your password"
                                keyboardType="default"
                                secureTextEntry={true}
                            />
                        </InputsContainer>
                    </TopContainer>
                    <BottomContainer>
                        <Pressable onPress={navigateToSignInScreen}>
                            <Text style={{ textAlign: "center", color: "#ef4444" }}>
                                Zaten bir hesabınız var mı?
                            </Text>
                        </Pressable>
                        <CustomButton
                            onPress={handleRegister}
                            style={{
                                backgroundColor: "#ef4444",
                                marginTop: 15,
                            }}
                        >
                            <ButtonText>Kayıt Ol</ButtonText>
                        </CustomButton>
                    </BottomContainer>
                </KeyboardCloser>
            </MainContainer>
        </SafeArea>
    );
};

export default SignUpScreen;
