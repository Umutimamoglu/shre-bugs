import React, { useContext, useState, useEffect } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
    TextInput,
    Dimensions,
    Pressable,
    Button,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { SafeArea } from '@src/components/main.style';
import { AccountContext } from '@src/services/account/account.context';
import { BASE_URL } from '@src/services/connections';

const ProfileScreen = () => {
    const { width, height } = Dimensions.get('window');

    // Context’ten user, logout ve updateProfile fonksiyonlarını alıyoruz
    const { user, logout, updateProfile } = useContext(AccountContext);

    // Ekrandaki form alanlarını yönetmek için state’ler
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [positionTitle, setPositionTitle] = useState('');
    const [userImage, setUserImage] = useState('');



    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setPositionTitle(user.positionTitle || '');
            console.log("🟠 Bug User Image:", user.image);

            if (user?.image) {
                setName(user.name || '');
                setEmail(user.email || '');
                setPositionTitle(user.positionTitle || '');

                const finalImageUrl = user.image.startsWith("http") ? user.image : `${BASE_URL}/${user.image}`;
                setUserImage(finalImageUrl);
                console.log("User image path ->", finalImageUrl);
            } else {
                setUserImage("");
            }
        }
    }, [user]);


    // Galeriden resim seç
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
            console.log('Seçilen resim:', result.assets[0].uri);
        }
    };

    // Kamera ile resim çek
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
            console.log('Çekilen resim:', result.assets[0].uri);
        }
    };

    // Profili güncelle
    const handleUpdateProfile = async () => {
        if (!user) {
            console.error('User is null. Profile cannot be updated.');
            return;
        }

        try {
            await updateProfile({
                _id: user._id,
                name,
                email,
                positionTitle,
                image: userImage,
            });
            console.log('Profil güncellendi!');
        } catch (err) {
            console.error('Profil güncellenirken hata oluştu:', err);
        }
    };

    return (
        <SafeArea>
            <View style={styles.container}>
                {user ? (
                    <View style={styles.centered}>
                        <View style={styles.imageContainer}>
                            {userImage ? (
                                <Image source={{ uri: userImage }} style={styles.profileImage} />
                            ) : (
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/100' }}
                                    style={styles.profileImage}
                                />
                            )}
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{user.name}</Text>
                            <Text style={styles.userEmail}>{user.email}</Text>
                        </View>
                    </View>
                ) : (
                    <Text style={styles.noUserText}>No user data available</Text>
                )}

                {/* Galeriden Seç */}
                <Pressable onPress={handleSelectImage} style={styles.pressable}>
                    <MaterialIcons name="photo-library" size={24} color="black" />
                    <Text style={styles.buttonText}>Galeriden Seç</Text>
                </Pressable>

                {/* Kamera ile Fotoğraf */}
                <Pressable onPress={handleCaptureImage} style={styles.pressable}>
                    <MaterialIcons name="photo-camera" size={24} color="black" />
                    <Text style={styles.buttonText}>Fotoğraf Çek</Text>
                </Pressable>

                {/* Kullanıcı Adı */}
                <TextInput
                    style={[styles.textInput, { width: width * 0.8, height: height * 0.05 }]}
                    value={name}
                    onChangeText={setName}
                    placeholder="Adınız"
                />

                {/* E-posta */}
                <TextInput
                    style={[styles.textInput, { width: width * 0.8, height: height * 0.05 }]}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="E-posta"
                />

                {/* Pozisyon Bilgisi */}
                <TextInput
                    style={[styles.textInput, { width: width * 0.8, height: height * 0.05 }]}
                    value={positionTitle}
                    onChangeText={setPositionTitle}
                    placeholder="Pozisyon"
                />

                {/* Butonlar */}
                <Button title="Profili Güncelle" onPress={handleUpdateProfile} />
                <Button title="Çıkış Yap" onPress={logout} />
            </View>
        </SafeArea>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        marginBottom: 16,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    userInfo: {
        alignItems: 'center',
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 16,
        color: 'gray',
    },
    noUserText: {
        fontSize: 18,
        textAlign: 'center',
    },
    textInput: {
        marginHorizontal: 1,
        fontSize: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 2,
        borderColor: '#3F3C3C',
    },
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        padding: 10,
        backgroundColor: 'lightgray',
        borderRadius: 5,
    },
    buttonText: {
        marginLeft: 5,
    },
});
