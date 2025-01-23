import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Heart icon için

import { AllBugsNavigationType } from '@src/infrastracture/navigation/types';
import { IAllBugs } from 'types';

type BugProps = {
    bug: IAllBugs;
};

const AllBug = ({ bug }: BugProps) => {
    const navigation = useNavigation<AllBugsNavigationType>();

    const navigateToBugDetailScreen = () => {
        navigation.navigate('AllBugDetail', { bug });
    };

    const formattedDate = new Date(bug.createdAt).toLocaleDateString();
    const formattedTime = new Date(bug.createdAt).toLocaleTimeString();

    // Metni belli bir karakterden sonra kesmek için
    const truncateText = (text: string, limit: number) => {
        return text.length > limit ? text.substring(0, limit) + '...' : text;
    };

    return (
        <View style={styles.wrapper}>
            {/* Sol taraftaki Heart ikonu */}
            <View style={styles.iconWrapper}>
                <FontAwesome name="heart" size={24} color={bug.color.code} />
            </View>

            {/* Sağ taraftaki kartın tamamı */}
            <Pressable onPress={navigateToBugDetailScreen} style={[styles.cardContainer, { borderColor: bug.color.code }]}>
                {/* Kartın üst kısmı (beyaz) */}
                <View style={[styles.topSection]}>
                    <Text style={styles.languageAndType}>
                        {truncateText(bug.language, 10)}{'  '}
                        {truncateText(bug.type, 15)}
                    </Text>
                    <Text style={styles.bugName}>{truncateText(bug.name, 30)}</Text>
                </View>

                {/* Kartın alt kısmı (renkli) */}
                <View style={[styles.bottomSection, { backgroundColor: bug.color.code }]}>
                    <Text style={styles.bottomText}>
                        {bug.user.name} {'  '}
                        {formattedDate} {'  '}
                        {formattedTime}
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
