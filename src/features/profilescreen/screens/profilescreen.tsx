import React, { useContext, useState, useEffect, use } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
    TextInput,
    Dimensions,
    Pressable,
    Button,
    ScrollView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { SafeArea } from '@src/components/main.style';
import { AccountContext } from '@src/services/account/account.context';
import { BASE_URL } from '@src/services/connections';
import { theme } from '@src/theme';

const ProfileScreen = () => {
    const { width, height } = Dimensions.get('window');
    const { user, logout, updateProfile } = useContext(AccountContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [positionTitle, setPositionTitle] = useState('');
    const [userImage, setUserImage] = useState('');

    console.log(user)

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setPositionTitle(user.positionTitle || '');
            const finalImageUrl = user.image?.startsWith("http")
                ? user.image
                : `${BASE_URL}/${user.image}`;
            setUserImage(finalImageUrl || '');
        }
    }, [user]);

    const handleSelectImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Galeriye erişim izni gerekli!');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled && result.assets?.length) {
            setUserImage(result.assets[0].uri);
        }
    };

    const handleCaptureImage = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Kameraya erişim izni gerekli!');
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled && result.assets?.length) {
            setUserImage(result.assets[0].uri);
        }
    };

    const handleUpdateProfile = async () => {
        if (!user) return;
        await updateProfile({
            _id: user._id,
            name,
            email,
            positionTitle,
            image: userImage,
        });
    };

    return (
        <SafeArea edges={["top"]} color={theme.colors.ui.tertiary2}>
            <ScrollView contentContainerStyle={styles.container}>
                {user && (
                    <View style={styles.centered}>
                        <Image
                            source={{ uri: userImage || 'https://via.placeholder.com/100' }}
                            style={styles.profileImage}
                        />
                        <Text style={styles.userName}>{user.name}</Text>
                        <Text style={styles.userEmail}>{user.email}</Text>
                    </View>
                )}

                {/* Galeri ve Kamera */}
                <Pressable onPress={handleSelectImage} style={styles.pressable}>
                    <MaterialIcons name="photo-library" size={24} color="black" />
                    <Text style={styles.buttonText}>Galeriden Seç</Text>
                </Pressable>

                <Pressable onPress={handleCaptureImage} style={styles.pressable}>
                    <MaterialIcons name="photo-camera" size={24} color="black" />
                    <Text style={styles.buttonText}>Fotoğraf Çek</Text>
                </Pressable>

                {/* 📝 Hata Adı gibi stillerle input alanları */}
                <Text style={styles.label}>👤 İsim</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Adınız"
                />

                <Text style={styles.label}>📧 E-posta</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="E-posta"
                />

                <Text style={styles.label}>💼 Pozisyon</Text>
                <TextInput
                    style={styles.input}
                    value={positionTitle}
                    onChangeText={setPositionTitle}
                    placeholder="Pozisyon"
                />

                {/* Butonlar */}
                <View style={{ marginTop: 20 }}>
                    <Button title="Profili Güncelle" onPress={handleUpdateProfile} />
                    <Button title="Çıkış Yap" onPress={logout} color="#EF4444" />
                </View>
            </ScrollView>
        </SafeArea>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: theme.colors.ui.tertiary2,
    },
    centered: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 16,
        color: 'gray',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 16,
        color: '#555',
    },
    input: {
        fontSize: 16,
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        marginTop: 6,
        borderColor: '#ccc',
        borderWidth: 2,
    },
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        padding: 10,
        backgroundColor: '#e5e7eb',
        borderRadius: 8,
    },
    buttonText: {
        marginLeft: 8,
        fontSize: 16,
    },
});
