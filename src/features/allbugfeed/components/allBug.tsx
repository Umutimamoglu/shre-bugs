import React, { useMemo } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { AllBugsNavigationType } from '@src/infrastracture/navigation/types';
import { IAllBugs } from 'types';
import { useBug } from '@src/services/bugs/bugs.context';

type BugProps = {
    bug: IAllBugs;
};

const AllBug = ({ bug }: BugProps) => {
    const navigation = useNavigation<AllBugsNavigationType>();
    const { allFavorites } = useBug();

    const navigateToBugDetailScreen = () => {
        navigation.navigate('AllBugDetail', { bug });
    };

    const isFavorite = useMemo(() => {
        if (!Array.isArray(allFavorites)) return false;
        return allFavorites.some(fav => fav._id?.toString() === bug._id?.toString());
    }, [allFavorites, bug._id]);

    const formattedDate = new Date(bug.createdAt).toLocaleDateString();
    const formattedTime = new Date(bug.createdAt).toLocaleTimeString();
    const heartIcon = isFavorite ? 'heart' : 'heart-o';

    const truncate = (text: string, max: number) =>
        text.length > max ? text.slice(0, max) + '...' : text;

    return (
        <View style={styles.wrapper}>
            <View style={styles.iconWrapper}>
                <FontAwesome name={heartIcon} size={24} color={bug.color.code} />
            </View>

            <Pressable
                onPress={navigateToBugDetailScreen}
                style={[styles.cardContainer, { borderColor: bug.color.code }]}
            >
                <View style={styles.topSection}>
                    <Text style={styles.languageAndType}>
                        {truncate(bug.language, 10)}{'  '}
                        {truncate(bug.type, 15)}
                    </Text>
                    <Text style={styles.bugName}>{truncate(bug.name, 30)}</Text>
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
