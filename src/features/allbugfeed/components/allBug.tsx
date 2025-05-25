import React, { useEffect, useState } from 'react';
import { Pressable, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AllBugsNavigationType } from '@src/infrastracture/navigation/types';
import { IAllBugs } from 'types';
import { useBug } from '@src/services/bugs/bugs.context';

type BugProps = {
    bug: IAllBugs;
};

const AllBug = ({ bug }: BugProps) => {
    const navigation = useNavigation<AllBugsNavigationType>();
    const { addFavroites } = useBug();
    const [pressed, setPressed] = useState(false);

    // AsyncStorage'tan favori durumunu oku
    useEffect(() => {
        const loadFavorite = async () => {
            try {
                const storedValue = await AsyncStorage.getItem(`favorite:${bug._id}`);
                if (storedValue === 'true') {
                    setPressed(true);
                }
            } catch (err) {
                console.error("Favori durumu okunamadı:", err);
            }
        };
        loadFavorite();
    }, [bug._id]);

    // Favori durumunu değiştir
    const toggleFavorite = async () => {
        try {
            const newState = !pressed;
            setPressed(newState);
            await AsyncStorage.setItem(`favorite:${bug._id}`, newState.toString());

            if (newState) {
                await addFavroites(bug);
            }
            // Burada favoriden çıkarma işlemi istenirse yapılabilir
        } catch (err) {
            console.error("Favori güncellenemedi:", err);
        }
    };

    const navigateToBugDetailScreen = () => {
        navigation.navigate('AllBugDetail', { bug });
    };

    const formattedDate = new Date(bug.createdAt).toLocaleDateString();
    const formattedTime = new Date(bug.createdAt).toLocaleTimeString();

    const truncateText = (text: string, limit: number) =>
        text.length > limit ? text.substring(0, limit) + '...' : text;

    return (
        <View style={styles.wrapper}>
            {/* Kalp ikonu */}
            <TouchableOpacity onPress={toggleFavorite}>
                <View style={styles.iconWrapper}>
                    <FontAwesome
                        name={pressed ? 'heart' : 'heart-o'}
                        size={24}
                        color={bug.color.code}
                    />
                </View>
            </TouchableOpacity>

            {/* Kartın geri kalanı */}
            <Pressable
                onPress={navigateToBugDetailScreen}
                style={[styles.cardContainer, { borderColor: bug.color.code }]}
            >
                <View style={styles.topSection}>
                    <Text style={styles.languageAndType}>
                        {truncateText(bug.language, 10)}{'  '}
                        {truncateText(bug.type, 15)}
                    </Text>
                    <Text style={styles.bugName}>{truncateText(bug.name, 30)}</Text>
                </View>

                <View style={[styles.bottomSection, { backgroundColor: bug.color.code }]}>
                    <Text style={styles.bottomText}>
                        {bug.user?.name ?? 'Unknown'} • {formattedDate} • {formattedTime}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
};

export default AllBug;
const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        marginVertical: 8, // Kartlar arasına dikey boşluk
    },
    iconWrapper: {
        width: 32,        // İkonun kapsayıcısı
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 4,   // Karttan biraz ayrık dursun
    },
    cardContainer: {
        flex: 1,
        borderWidth: 2,            // Renkli kenarlık
        borderRadius: 8,
        overflow: 'hidden',        // Köşe yuvarlamayı korumak için
    },
    topSection: {
        backgroundColor: '#fff',   // Üst kısım beyaz
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
    languageAndType: {
        fontSize: 14,
        fontWeight: '700',
        color: 'black',
        marginBottom: 4,
    },
    bugName: {
        fontSize: 14,
        fontWeight: '500',
        color: 'black',
    },
    bottomSection: {
        paddingVertical: 6,
        paddingHorizontal: 8,
    },
    bottomText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#fff',
    },
});
