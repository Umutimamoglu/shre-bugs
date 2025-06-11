import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,
    Modal,
    Pressable
} from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SafeArea } from '@src/components/main.style';
import { theme } from '@src/theme';
import { KeyboardCloser } from '@src/components/keyboard-closer.component';
import { ButtonText, CustomButton } from '../components/acoount.styled';
import { Header } from '../components/header.component';
import { Title } from '../components/title.component';
import { Controller, useForm } from 'react-hook-form';
import { AccountContext } from '@src/services/account/account.context';
import { BlurView } from 'expo-blur';

function EmailVerificationScreen() {
    const [keyboardActive, setKeyboardActive] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [otpCode, setOtpCode] = useState('');
    const inputRef = useRef<TextInput>(null);
    const { sendOtp } = useContext(AccountContext);

    const EmailVerificationSchema = z.object({
        email: z.string().email('Geçersiz e-posta'),
    });

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    type EmailVerificationData = z.infer<typeof EmailVerificationSchema>;

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<EmailVerificationData>({
        resolver: zodResolver(EmailVerificationSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = async (data: EmailVerificationData) => {
        try {
            await sendOtp(data.email);
            setModalVisible(true); // OTP gönderildikten sonra modal aç
        } catch (err) {
            console.error('Giriş hatası:', err);
            Alert.alert('Hata', 'Kod gönderilirken bir hata oluştu.');
        }
    };

    const handleOtpVerification = async () => {
        try {
            Alert.alert("Doğrulama Başarılı", `Kod: ${otpCode}`);
            setModalVisible(false);
        } catch (err) {
            Alert.alert("Doğrulama Hatası", "Kod yanlış veya süre dolmuş olabilir.");
        }
    };

    return (
        <SafeArea edges={['top']} color={theme.colors.ui.tertiary3}>
            <View style={styles.mainContainer}>
                <KeyboardCloser isEnabled>
                    {!keyboardActive && <Title />}
                    <Header title="Giriş Yap" subtitle="Hatalarını kolayca çöz" />
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value, onBlur } }) => (
                            <TextInput
                                ref={inputRef}
                                style={styles.input}
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
                    <CustomButton
                        height="50px"
                        onPress={handleSubmit(onSubmit)}
                        style={styles.button}
                    >
                        <ButtonText>Giriş Yap</ButtonText>
                    </CustomButton>
                </KeyboardCloser>

                {/* Yerleşik Modal */}
                <Modal
                    animationType="fade"
                    transparent
                    visible={isModalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <BlurView intensity={60} tint="dark" style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>E-posta Doğrulama</Text>
                            <TextInput
                                placeholder="6 haneli kod"
                                style={styles.otpInput}
                                keyboardType="number-pad"
                                value={otpCode}
                                onChangeText={setOtpCode}
                            />
                            <CustomButton onPress={handleOtpVerification}>
                                <ButtonText>Doğrula</ButtonText>
                            </CustomButton>
                            <Pressable onPress={() => setModalVisible(false)}>
                                <Text style={styles.cancelText}>İptal Et</Text>
                            </Pressable>
                        </View>
                    </BlurView>
                </Modal>
            </View>
        </SafeArea>
    );
}

export default EmailVerificationScreen;

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
        marginTop: 400
    },
    input: {
        width: 300,
        height: 44,
        backgroundColor: '#FAFAFA',
        borderRadius: 10,
        marginVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: '#ccc'
    },
    button: {
        backgroundColor: '#007AFF',
        marginTop: 15,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 300,
        backgroundColor: '#ffffffee',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000'
    },
    otpInput: {
        width: 200,
        height: 44,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 10,
        paddingHorizontal: 10,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    cancelText: {
        color: '#007AFF',
        marginTop: 10
    }
});
