import React, { useState } from 'react';
import { View, Image, Pressable, StyleSheet, Text } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { AllBugsNavigationType, AllBugsStackParamList } from '@src/infrastracture/navigation/types';
import { SafeArea } from '@src/components/main.style';
import { axiosInstance } from '@src/services/account/account.service';
import { useBug } from '@src/services/bugs/bugs.context';
import UpdateButton from '@src/features/mybugs/components/buttonscomponent';
import { MaterialIcons } from '@expo/vector-icons';

type BugDetailRouteProp = RouteProp<AllBugsStackParamList, 'AllBugDetail'>;

const AllBugDetail = () => {
    const route = useRoute<BugDetailRouteProp>();
    const { bug } = route.params;
    const { addFavroites } = useBug();
    const navigation = useNavigation<AllBugsNavigationType>();

    const navigateToAllBugChatScreen = () => {
        navigation.navigate("ChatScreen", { bug });
    };

    const [pressed, setPressed] = useState(false);

    return (
        <SafeArea>
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
                        onPress={() => addFavroites(bug)}
                        style={({ pressed }) => [
                            {
                                opacity: pressed ? 0.6 : 1,
                            },
                        ]}
                    >
                        <MaterialIcons name="favorite-border" size={24} color="black" />
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
                    <UpdateButton onPress={navigateToAllBugChatScreen}>
                        <Text>Sohbete Git</Text>
                    </UpdateButton>
                </View>
            </View>
        </SafeArea>
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
        textShadowColor: 'rgba(239, 68, 68, 0.2)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
        color: 'white',
    },
    separator: {
        height: 1,
        backgroundColor: '#3F3C3C',
        marginVertical: 16,
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
        borderWidth: 2,
        borderColor: '#3F3C3C',
    },
    infoText: {
        fontSize: 15,
        lineHeight: 19,
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
    buttonContainer: {
        marginTop: 56,
        alignItems: 'center',
    },
});

export default AllBugDetail;
