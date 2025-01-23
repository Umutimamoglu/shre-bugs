import React, { useState } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EvilIcons from '@expo/vector-icons/EvilIcons';

import { useBug } from '@src/services/bugs/bugs.context';
import { BugsNavigationType } from '@src/infrastracture/navigation/types';
import { IBug } from 'types';

type BugProps = {
    bug: IBug;
};

const Bug = ({ bug }: BugProps) => {
    const { deleteBug } = useBug(); // Context'ten deleteBug işlevi
    const [isPressed, setIsPressed] = useState(false);
    const navigation = useNavigation<BugsNavigationType>();

    // Detay ekranına yönlendirme
    const navigateToBugDetailScreen = () => {
        navigation.navigate("BugDetail", { bug });
    };

    // Yazıyı kısaltmak için
    const truncateText = (text: string, limit: number) => {
        return text.length > limit ? text.substring(0, limit) + '...' : text;
    };

    // Silme işlemi
    const handleDelete = async () => {
        try {
            await deleteBug(bug._id); // ID'yi deleteBug fonksiyonuna geçir
            console.log(`Bug with ID ${bug._id} deleted successfully.`);
        } catch (error) {
            console.error("Error while deleting the bug:", error);
        }
    };

    return (
        <Pressable onPress={navigateToBugDetailScreen}>
            <View style={[styles.container, { backgroundColor: bug.color.code }]}>
                <View style={styles.row}>
                    <View style={styles.row}>
                        <Text style={styles.text}>
                            {truncateText(bug.language, 5)}
                        </Text>
                        <Text style={styles.text}>
                            {truncateText(bug.type, 10)}
                        </Text>
                        <Text style={styles.text}>
                            {truncateText(bug.name, 10)}
                        </Text>
                        <Pressable
                            onPress={handleDelete} // Silme işlemini çağır
                            onPressIn={() => setIsPressed(true)}
                            onPressOut={() => setIsPressed(false)}
                            style={({ pressed }) => [
                                styles.trashIcon,
                                pressed && styles.pressedIcon,
                                isPressed && styles.pressedIcon,
                            ]}
                        >
                            <EvilIcons name="trash" size={24} color="black" />
                        </Pressable>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 13,
        borderRadius: 16,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
        marginRight: 10,
        color: 'black',
    },
    trashIcon: {
        opacity: 1,
        transform: [{ scale: 1 }],
    },
    pressedIcon: {
        opacity: 0.5,
        transform: [{ scale: 0.9 }],
    },
});

export default Bug;
