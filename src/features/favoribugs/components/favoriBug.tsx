import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AllBugsNavigationType } from '@src/infrastracture/navigation/types';
import { IAllBugs } from 'types';

type BugProps = {
    bug: IAllBugs;
};

const FavoriBug = ({ bug }: BugProps) => {
    const navigation = useNavigation<AllBugsNavigationType>();

    const navigateToBugDetailScreen = () => {
        navigation.navigate('FavoriBugDettail', { bug });
    };

    // Eğer createdAt eksik ise, Date() "Invalid Date" olabilir.
    // İsteğe bağlı: null kontrolü eklerseniz:
    // const creationDate = bug.createdAt ? new Date(bug.createdAt) : new Date();
    const creationDate = new Date(bug.createdAt);
    const formattedDate = creationDate.toLocaleDateString();
    const formattedTime = creationDate.toLocaleTimeString();

    const truncateText = (text: string, limit: number) =>
        text.length > limit ? text.substring(0, limit) + '...' : text;

    return (
        <Pressable onPress={navigateToBugDetailScreen}>
            {/* Arka plan rengi: eğer bug.color yoksa varsayılan (#DDD) kullan */}
            <View style={[styles.container, { backgroundColor: bug.color?.code ?? '#DDD' }]}>
                <View style={styles.rowSpaceBetween}>
                    <View style={styles.row}>
                        {/* user?.name => user null ise undefined döner, ?? 'Unknown' => undefined ise 'Unknown' göster. */}
                        <Text style={styles.text}>{bug.user?.name ?? 'Unknown'}</Text>
                        <Text style={styles.text}>{formattedDate}</Text>
                        <Text style={styles.text}>{formattedTime}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <Text style={styles.text}>
                        {truncateText(bug.language ?? 'N/A', 10)}
                    </Text>
                    <Text style={styles.text}>
                        {truncateText(bug.type ?? 'N/A', 10)}
                    </Text>
                    <Text style={styles.text}>
                        {truncateText(bug.name ?? 'N/A', 10)}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 80,
        padding: 13,
        borderRadius: 16,
    },
    rowSpaceBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
        padding: 1,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        marginRight: 6,
    },
});

export default FavoriBug;
