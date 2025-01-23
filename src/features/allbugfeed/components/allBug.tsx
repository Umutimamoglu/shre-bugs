import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { AllBugsNavigationType } from '@src/infrastracture/navigation/types';
import { IAllBugs } from 'types';


type BugProps = {
    bug: IAllBugs
};

const AllBug = ({ bug }: BugProps) => {
    const navigation = useNavigation<AllBugsNavigationType>();

    const navigateToBugDetailScreen = () => {
        navigation.navigate("AllBugDetail", { bug });
    };

    const formattedDate = new Date(bug.createdAt).toLocaleDateString();
    const formattedTime = new Date(bug.createdAt).toLocaleTimeString();

    const truncateText = (text: string, limit: number) => {
        return text.length > limit ? text.substring(0, limit) + '...' : text;
    };

    return (
        <Pressable onPress={navigateToBugDetailScreen} style={[styles.container, { backgroundColor: bug.color.code }]}>
            <View style={styles.headerRow}>
                <View style={styles.rowItem}>
                    <Text style={styles.text}>{bug.user.name}</Text>
                    <Text style={styles.text}>{formattedDate}</Text>
                    <Text style={styles.text}>{formattedTime}</Text>
                </View>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.text}>{truncateText(bug.language, 10)}</Text>
                <Text style={styles.text}>{truncateText(bug.type, 10)}</Text>
                <Text style={styles.text}>{truncateText(bug.name, 10)}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 80,
        padding: 13,
        borderRadius: 16,
        marginBottom: 10,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 1,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 1,
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
        marginRight: 10,
        color: 'black',
    },
});

export default AllBug;
