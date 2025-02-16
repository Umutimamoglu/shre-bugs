import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { IAllBugs, IBug } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { BugsNavigationType } from '../../navigation/types';
import { Box, Text } from '../../utils/theme';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import axiosInstance from '../../service/config';

type BugProps = {
    bug: IBug
};



const Bug = ({ bug }: BugProps) => {
    const [isPressed, setIsPressed] = useState(false);
    const navigation = useNavigation<BugsNavigationType>();

    const navigateToBugDetailScreen = () => {
        navigation.navigate("BugDetail", { bug });
    }

    const truncateText = (text: string, limit: number) => {
        return text.length > limit ? text.substring(0, limit) + '...' : text;
    };

    const deleteBug = async () => {
        try {
            const response = await axiosInstance.delete(`/api/errors/deleteError/${bug._id}`);
            if (response.status === 200) {
                console.log('Bug deleted successfully');

            } else {
                console.error('Failed to delete bug');
            }
        } catch (error) {
            console.error('Error while deleting bug:', error);
        }
    };

    return (
        <Pressable onPress={navigateToBugDetailScreen}>
            <Box style={{ backgroundColor: bug.color.code, padding: 13, borderRadius: 16 }}>
                <Box flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Box flexDirection="row" style={{ padding: 1 }}>
                        <Text variant="textBase" fontWeight="600" mr="3">
                            {truncateText(bug.language, 5)}
                        </Text>
                        <Text variant="textBase" fontWeight="600" mr="3">
                            {truncateText(bug.type, 10)}
                        </Text>
                        <Text variant="textBase" fontWeight="600" mr="3">
                            {truncateText(bug.name, 10)}
                        </Text>
                        <Pressable
                            onPress={deleteBug}
                            onPressIn={() => setIsPressed(true)}
                            onPressOut={() => setIsPressed(false)}
                            style={({ pressed }) => [
                                {
                                    opacity: pressed ? 0.5 : 1,
                                    transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1 }]

                                }
                            ]}
                        >
                            <EvilIcons name="trash" size={24} color="black" />
                        </Pressable>
                    </Box>
                </Box>
            </Box>
        </Pressable>
    );
}

export default Bug;