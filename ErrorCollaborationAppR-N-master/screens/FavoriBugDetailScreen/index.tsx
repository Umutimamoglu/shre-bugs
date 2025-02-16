import React from 'react';
import {
    View,
    Text,
    Image,
    Pressable,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import {
    AllBugsNavigationType,
    AllBugsStackParamList,
} from '../../navigation/types';

// Eğer BASE_URL veya axiosInstance kullanacaksanız:
import axiosInstance from '../../service/config';
// import { BASE_URL } from '../../service/config'; // Gerekirse

type BugDetailRouteProp = RouteProp<AllBugsStackParamList, 'FavoriBugDettail'>;

const FavoriBugDettailScreen = () => {
    const route = useRoute<BugDetailRouteProp>();
    const { bug } = route.params;
    const navigation = useNavigation<AllBugsNavigationType>();

    const navigateToAllBugChatScreen = () => {
        navigation.navigate('ChatScreen', { bug });
    };

    // Eğer bug.image'i tam URL ile kaydettiyseniz (örn. "https://..."),
    // aşağıdaki kullanım yerine direk bug.image'i kullanabilirsiniz.
    // Aksi halde, backend'deki resmi çekmek için tam yol gerekiyor.
    const imageUri = bug.image
        ? `${axiosInstance.defaults.baseURL}/${bug.image}`
        : null;

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.headerText}>Hata Detayları</Text>

                <View style={styles.imageContainer}>
                    {imageUri ? (
                        <Image
                            source={{ uri: imageUri }}
                            style={styles.image}
                            onError={() =>
                                console.warn('Resim yüklenemedi, varsayılan kullanılacak')
                            }
                        />
                    ) : (
                        <Text>Resim Bulunamadı</Text>
                    )}
                </View>

                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>{bug.language}</Text>
                </View>

                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>{bug.name}</Text>
                </View>

                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>{bug.howDidIFix}</Text>
                </View>

                <Pressable onPress={navigateToAllBugChatScreen} style={styles.button}>
                    <Text style={styles.buttonText}>Mesaj Gönder</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        // "zinc400" yerine yaklaşık bir gri ton (örnek: #a1a1aa)
        backgroundColor: '#a1a1aa',
    },
    container: {
        flex: 1,
        marginHorizontal: 8, // Box mx="1" yerine 8 piksel
    },
    headerText: {
        fontSize: 24, // "textXl"
        textAlign: 'center',
        marginBottom: 16, // mb="4" => 4*4=16 piksel
        marginTop: 8,
        fontWeight: 'bold',
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16,
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
    },
    infoBox: {
        // Box ml='5' ve mr='5' => 5*4=20 piksel kenarlıklar
        marginHorizontal: 20,
        // "gray250" yerine yaklaşık bir açık gri ton
        backgroundColor: '#f5f5f4',
        // "rounded-2xl" => borderRadius=16
        borderRadius: 16,
        marginBottom: 16,
    },
    infoText: {
        fontSize: 15,
        lineHeight: 19,
        padding: 12,
        alignSelf: 'flex-start',
    },
    button: {
        marginTop: 56, // mt="14" => 14*4=56
        alignSelf: 'center',
        backgroundColor: '#007AFF', // iOS mavisi örneği
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default FavoriBugDettailScreen;
