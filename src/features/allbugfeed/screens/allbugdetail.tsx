import React, { useEffect, useState } from 'react';
import { View, Image, Pressable, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { AllBugsNavigationType, AllBugsStackParamList } from '@src/infrastracture/navigation/types';
import { SafeArea } from '@src/components/main.style';
import { axiosInstance } from '@src/services/account/account.service';
import { useBug } from '@src/services/bugs/bugs.context';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import UpdateButton from '@src/features/mybugs/components/buttonscomponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomButton } from '@src/features/account/components/acoount.styled';
import { UpdateButtonText } from '@src/features/mybugs/components/bugdetailcomp.styled';
import { theme } from '@src/theme';
import { BackButton, HeaderTitle } from '../components/feed.Styled';
import { HeaderContainerMyBugs } from '@src/features/mybugs/components/mybug.styled';

type BugDetailRouteProp = RouteProp<AllBugsStackParamList, 'AllBugDetail'>;

const AllBugDetail = () => {
    const route = useRoute<BugDetailRouteProp>();
    const { bug } = route.params;
    const { addFavroites } = useBug();
    const navigation = useNavigation<AllBugsNavigationType>();

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const loadFavoriteStatus = async () => {
            try {
                const stored = await AsyncStorage.getItem(`favorite:${bug._id}`);
                if (stored === 'true') {
                    setIsFavorite(true);
                }
            } catch (e) {
                console.error("Favori durumu alınamadı:", e);
            }
        };
        loadFavoriteStatus();
    }, [bug._id]);

    const toggleFavorite = async () => {
        try {
            const newStatus = !isFavorite;
            setIsFavorite(newStatus);
            await AsyncStorage.setItem(`favorite:${bug._id}`, newStatus.toString());
            if (newStatus) {
                await addFavroites(bug);
            }
            // Favoriden çıkarma yapılacaksa buraya ekleyebilirsin
        } catch (e) {
            console.error("Favori güncellenemedi:", e);
        }
    };

    const navigateToAllBugChatScreen = () => {
        navigation.navigate("ChatScreen", { bug });
    };

    return (
        <SafeArea edges={['top']} color={theme.colors.ui.tertiary2}>
            <ScrollView>
                <HeaderContainerMyBugs>
                    <BackButton onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name="arrow-left" size={36} color='black' />
                    </BackButton>
                    <HeaderTitle>Hata Detayı</HeaderTitle>
                    <TouchableOpacity onPress={() => navigation.goBack}>
                        <MaterialCommunityIcons name="information" size={36} color={bug.color.code} />
                    </TouchableOpacity>
                </HeaderContainerMyBugs>



                <View style={styles.container}>


                    {bug.image && (
                        <Image
                            source={{ uri: `${axiosInstance.defaults.baseURL}/${bug.image}` }}
                            style={styles.image}
                        />
                    )}

                    {/* ⭐ Kalp ikonu */}
                    <Pressable onPress={toggleFavorite} style={{ alignSelf: 'center', marginTop: 10 }}>
                        <MaterialIcons
                            name={isFavorite ? 'favorite' : 'favorite-border'}
                            size={28}
                            color={bug.color.code}
                        />
                    </Pressable>

                    <Text style={styles.label}>📝 Hata Adı</Text>
                    <Text style={styles.value}>{bug.name}</Text>

                    <Text style={styles.label}>⚙️ Tür</Text>
                    <Text style={styles.value}>{bug.type}</Text>

                    <Text style={styles.label}>💻 Dil</Text>
                    <Text style={styles.value}>{bug.language}</Text>

                    <Text style={styles.label}>🛠️ Nasıl Çözüldü?</Text>
                    <Text style={styles.value}>{bug.howDidIFix || "Belirtilmedi"}</Text>

                    <Text style={styles.label}>📌 Durum</Text>
                    <Text style={styles.value}>{bug.isFixed ? "✔️ Düzeltildi" : "❌ Bekliyor"}</Text>


                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <CustomButton
                            onPress={navigateToAllBugChatScreen}
                            color={bug.color.code}
                            height="44px"
                            width="32%"
                            borderRadius="12px"
                            marginTop="0"
                            style={({ pressed }: { pressed: boolean }) => [
                                {
                                    opacity: pressed ? 0.7 : 1,
                                    transform: pressed ? [{ scale: 0.97 }] : [{ scale: 1 }],
                                },
                            ]}
                        >
                            <UpdateButtonText>Sohbete Git</UpdateButtonText>
                        </CustomButton>
                    </View>
                </View>
            </ScrollView>
        </SafeArea>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.ui.tertiary2,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 20,
        color: '#333',
    },
    image: {
        width: '100%',
        height: 180,
        borderRadius: 12,
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 12,
        color: '#666',
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111',
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 8,
        marginTop: 4,
    },
});

export default AllBugDetail;



