import React, { useState } from 'react';
import { View, Image, Pressable, StyleSheet, Alert, Text } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { AllBugsNavigationType, AllBugsStackParamList } from '../../navigation/types';
import SafeAreaWrapper from '../../src/shared/safe-area-wrapper';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axiosInstance, { BASE_URL } from '../../service/config';
import Button from '../../src/shared/button';

type BugDetailRouteProp = RouteProp<AllBugsStackParamList, 'AllBugDetail'>;

const AllBugDetail = () => {

    const route = useRoute<BugDetailRouteProp>();
    const { bug } = route.params;

    const navigation = useNavigation<AllBugsNavigationType>();

    const navigateToAllBugChatScreen = () => {
        navigation.navigate("ChatScreen", { bug });
    }

    const [pressed, setPressed] = useState(false);

    const addToFavorites = async () => {
        try {
            const data = {
                name: bug.name,
                isFixed: bug.isFixed,
                image: bug.image ? `${BASE_URL}${bug.image}` : null,
                color: {
                    id: bug.color.id,
                    name: bug.color.name,
                    code: bug.color.code
                },
                language: bug.language,
                type: bug.type,
                howDidIFix: bug.howDidIFix || ''
            };

            await axiosInstance.post('/api/errors/addToFavorites', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            Alert.alert("Başarıyla eklendi", "Hata favorilere eklendi!");
        } catch (error) {
            console.error('Error adding to favorites:', error.response?.data || error.message);
            Alert.alert("Hata", "Favorilere eklerken bir hata oluştu.");
        }
    };

    return (
        <SafeAreaWrapper>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Hata Detayları</Text>
                </View>

                <View style={styles.separator} />

                <View style={styles.imageContainer}>
                    {bug.image ? (
                        <Image
                            source={{ uri: `${axiosInstance.defaults.baseURL}/${bug.image}` }}
                            style={styles.image}
                            onError={() => console.warn('Resim yüklenemedi, varsayılan kullanılacak')}
                        />
                    ) : (
                        <Text>Resim Bulunamadı</Text>
                    )}
                    <Pressable
                        onPressIn={() => setPressed(true)}
                        onPressOut={() => setPressed(false)}
                        onPress={addToFavorites}
                        style={({ pressed }) => [
                            {
                                opacity: pressed ? 0.6 : 1,
                            },
                        ]}
                    >
                        <FontAwesome name="heart-o" size={24} color="black" />
                    </Pressable>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>{bug.language}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>{bug.name}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>{bug.howDidIFix}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button label="Mesaj Gonder" onPress={navigateToAllBugChatScreen} />
                </View>
            </View>
        </SafeAreaWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D8D0D0',
    },
    header: {
        marginVertical: 16,
        alignItems: 'center',
    },

    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textShadowColor: 'rgba(239, 68, 68, 0.2)', // Kırmızı gölge rengi, %80 opaklık
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
        color: 'white',
    },

    separator: {
        height: 1, // İnce çizgi
        backgroundColor: '#3F3C3C', // Çizginin rengi
        marginVertical: 16, // Çizginin yukarıdan ve aşağıdan boşluğu
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 16,
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
    },
    infoContainer: {
        marginHorizontal: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        marginBottom: 16,
        padding: 12,
        borderWidth: 2, // Kenar çizgisi genişliği
        borderColor: '#3F3C3C', // Kenar çizgisi rengi
    },
    infoText: {
        fontSize: 15,
        lineHeight: 19,
        textAlign: 'center',
        color: 'black', // Yazı rengi
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.1)', // Gölge rengi
        textShadowOffset: { width: 2, height: 2 }, // Gölge yerleşimi
        textShadowRadius: 4, // Gölge genişliği
    },
    buttonContainer: {
        marginTop: 56,
        alignItems: 'center',
    },
});

export default AllBugDetail;