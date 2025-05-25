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
    ScrollView,
    Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { SafeArea } from '@src/components/main.style';
import { AccountContext } from '@src/services/account/account.context';
import { BASE_URL } from '@src/services/connections';
import { theme } from '@src/theme';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';

const ProfileScreen = () => {
    const { width } = Dimensions.get('window');
    const { user, logout, updateProfile } = useContext(AccountContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [positionTitle, setPositionTitle] = useState('');
    const [userImage, setUserImage] = useState('');
    const [fixedBugsCount, setFixedBugsCount] = useState('');
    const [experience, setExperience] = useState('');
    const [countryCode, setCountryCode] = useState<CountryCode>('TR');
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setPositionTitle(user.positionTitle || '');
            setFixedBugsCount(user.fixedBugsCount || '');
            setExperience(user.experience || '');

            if (user.country && typeof user.country === 'string' && user.country.length === 2) {
                setCountryCode(user.country as CountryCode);
            }

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
            fixedBugsCount,
            experience,
            country: selectedCountry?.cca2 || countryCode || ''
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

                <Pressable onPress={handleSelectImage} style={styles.pressable}>
                    <MaterialIcons name="photo-library" size={24} color="black" />
                    <Text style={styles.buttonText}>Galeriden Seç</Text>
                </Pressable>

                <Pressable onPress={handleCaptureImage} style={styles.pressable}>
                    <MaterialIcons name="photo-camera" size={24} color="black" />
                    <Text style={styles.buttonText}>Fotoğraf Çek</Text>
                </Pressable>

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

                <Text style={styles.label}>📈 Deneyim</Text>
                <TextInput
                    style={styles.input}
                    value={experience}
                    onChangeText={setExperience}
                    placeholder="Örn: 3 yıl"
                />

                <Text style={styles.label}>🌍 Ülke</Text>
                <Pressable
                    onPress={() => setIsCountryModalOpen(true)}
                    style={styles.countryPicker}
                >
                    <Text style={{ fontSize: 16 }}>
                        {
                            typeof selectedCountry?.name === 'string'
                                ? selectedCountry.name
                                : typeof selectedCountry?.name === 'object' && 'common' in selectedCountry.name
                                    ? selectedCountry.name.common
                                    : 'Ülke seç'
                        }
                    </Text>
                </Pressable>

                <CountryPicker
                    visible={isCountryModalOpen}
                    withFilter
                    withFlag
                    withCountryNameButton={false}
                    withAlphaFilter
                    withEmoji
                    countryCode={countryCode}
                    onClose={() => setIsCountryModalOpen(false)}
                    onSelect={(country: Country) => {
                        setSelectedCountry(country);
                        setCountryCode(country.cca2);
                        setIsCountryModalOpen(false);
                    }}
                />

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
    countryPicker: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        padding: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 2,
    },
});
