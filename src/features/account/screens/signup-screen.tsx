import React, { useContext, useEffect, useState } from 'react';
import { Pressable, Alert, TextInput, View, Text, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardCloser } from "@src/components/keyboard-closer.component";
import { AuthScreenNavigationType } from '@src/infrastracture/navigation/types';
import { AccountContext } from '@src/services/account/account.context';
import { BottomContainer, ButtonText, CustomButton, TopContainer } from '../components/acoount.styled';
import { MainContainer, SafeArea } from '@src/components/main.style';
import { theme } from '@src/theme';
import { Title } from '../components/title.component';


const SingUpScreen = () => {
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
        <SafeArea edges={["top"]} color={theme.colors.white}>
            <MainContainer color={"#D8D0D0"}>
                <KeyboardCloser isEnabled>
                    <TopContainer>
                        {!keyboardActive && <Title />}
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
                    </TopContainer>
                    <BottomContainer>
                        <Pressable onPress={navigateToSignInScreen}>
                            <Text style={{ textAlign: 'center', color: "#ef4444" }}>
                                Zaten bir hesabınız var mı?
                            </Text>
                        </Pressable>
                        <CustomButton
                            onPress={handleRegister}
                            style={{ backgroundColor: '#ef4444', marginTop: 15 }}
                        >
                            <ButtonText>Kayıt Ol</ButtonText>
                        </CustomButton>
                    </BottomContainer>
                </KeyboardCloser>
            </MainContainer>
        </SafeArea>
    );
};

export default SingUpScreen;
