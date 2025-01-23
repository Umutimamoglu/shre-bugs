import { SafeArea } from '@src/components/main.style';
import { theme } from '@src/theme';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

function FeedScreen() {

    return (
        <SafeArea edges={[]} color={theme.colors.ui.tertiary}>
            <Text>
                {"feeed screeen"}
            </Text>
        </SafeArea>
    );
}

export default FeedScreen;

