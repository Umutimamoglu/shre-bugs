import { FlatList, Pressable, View, TextInput, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';

import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { IBug } from 'types';
import { BugsNavigationType } from '@src/infrastracture/navigation/types';
import { SafeArea } from '@src/components/main.style';
import { theme } from '@src/theme';


const BugDetailScreen = () => {




    return (
        <SafeArea edges={[]} color={theme.colors.brand.secondary}>
            <Text>
                Bug detail screeen
            </Text>
        </SafeArea>
    )



};

export default BugDetailScreen;