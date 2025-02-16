import React from 'react';
import { Pressable, View } from 'react-native';
import { IAllBugs } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { AllBugsNavigationType } from '../../navigation/types';
import { Box, Text } from '../../utils/theme';

type BugProps = {
    bug: IAllBugs
};
const FavoriBug = ({ bug }: BugProps) => {
    const navigation = useNavigation<AllBugsNavigationType>();

    const navigateToBugDetailScreen = () => {
        navigation.navigate("FavoriBugDettail", { bug });
    }


    const formattedDate = new Date(bug.createdAt).toLocaleDateString();
    const formattedTime = new Date(bug.createdAt).toLocaleTimeString();

    const truncateText = (text: string, limit: number) => {
        return text.length > limit ? text.substring(0, limit) + '...' : text;
    };


    return (
        <Pressable onPress={navigateToBugDetailScreen}>
            <Box height={80} style={{ backgroundColor: bug.color.code, padding: 13, borderRadius: 16 }}>
                <Box flexDirection="row" alignItems="center" justifyContent="space-between">
                    <Box flexDirection="row" style={{ padding: 1 }}>
                        <Text variant="textBase" fontWeight="600" mr="3">
                            {bug.user.name}


                        </Text>
                        <Text variant="textBase" fontWeight="600" mr="3">
                            {formattedDate}
                        </Text>
                        <Text variant="textBase" fontWeight="600" mr="3">
                            {formattedTime}
                        </Text>
                    </Box>
                </Box>
                <Box flexDirection="row" style={{ padding: 1 }}>
                    <Text variant="textBase" fontWeight="600" mr="3">
                        {truncateText(bug.language, 10)} {/* 10 karakter sınırı */}
                    </Text>
                    <Text variant="textBase" fontWeight="600" mr="3">
                        {truncateText(bug.type, 10)} {/* 10 karakter sınırı */}
                    </Text>
                    <Text variant="textBase" fontWeight="600" mr="3">
                        {truncateText(bug.name, 10)} {/* 10 karakter sınırı */}
                    </Text>
                </Box>

            </Box>
        </Pressable>
    )
}

export default FavoriBug;
