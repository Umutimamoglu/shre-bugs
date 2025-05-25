import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { AllBugsNavigationType, AllBugsStackParamList } from '@src/infrastracture/navigation/types';
import { axiosInstance } from '@src/services/account/account.service';
import { SafeArea } from '@src/components/main.style';
import { theme } from '@src/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CustomButton } from '@src/features/account/components/acoount.styled';
import { UpdateButtonText } from '@src/features/mybugs/components/bugdetailcomp.styled';

import { HeaderContainerMyBugs } from '@src/features/mybugs/components/mybug.styled';
import { BackButton, HeaderTitle } from '@src/features/allbugfeed/components/feed.Styled';
import { ButtonText } from '@src/features/home/components/home.styled';

type BugDetailRouteProp = RouteProp<AllBugsStackParamList, 'FavoriBugDettail'>;

const FavoriBugDettailScreen = () => {
    const route = useRoute<BugDetailRouteProp>();
    const { bug } = route.params;
    const navigation = useNavigation<AllBugsNavigationType>();

    const navigateToAllBugChatScreen = () => {
        navigation.navigate('ChatScreen', { bug });
    };

    return (
        <SafeArea edges={['top']} color={theme.colors.ui.tertiary2}>
            <HeaderContainerMyBugs>
                <BackButton onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="arrow-left" size={36} color="#000" />
                </BackButton>
                <HeaderTitle>Hata Detayı</HeaderTitle>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="information" size={36} color="black" />
                </TouchableOpacity>
            </HeaderContainerMyBugs>

            <View style={styles.container}>
                {bug.image && (
                    <Image
                        source={{ uri: `${axiosInstance.defaults.baseURL}/${bug.image}` }}
                        style={styles.image}
                    />
                )}

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
                        width="36%"
                        borderRadius="12px"
                        marginTop="0"
                        style={({ pressed }: { pressed: boolean }) => [
                            {
                                opacity: pressed ? 0.7 : 1,
                                transform: pressed ? [{ scale: 0.97 }] : [{ scale: 1 }],
                            },
                        ]}
                    >
                        <UpdateButtonText>Mesaj Gönder</UpdateButtonText>
                    </CustomButton>
                </View>
            </View>
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

export default FavoriBugDettailScreen;
