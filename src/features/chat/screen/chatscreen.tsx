import { View, Image, StyleSheet, Text, TextInput, Dimensions, Platform, PermissionsAndroid, Pressable } from 'react-native';
import React, { useContext, useState } from 'react';

import { launchImageLibrary, launchCamera, ImagePickerResponse, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';

import { MaterialIcons } from '@expo/vector-icons';
import { SafeArea } from '@src/components/main.style';
import { theme } from '@src/theme';
import { useBug } from '@src/services/bugs/bugs.context';
import { AccountContext } from '@src/services/account/account.context';
import { CustomButton } from '@src/features/account/components/acoount.styled';

const ChatScreen = () => {


    const { isLoading, error, logout } = useContext(AccountContext);


    return (
        <SafeArea edges={[]} color={theme.colors.ui.tertiary}>
            <Text>
                ChatScreen screeennnnnn

            </Text>

            <CustomButton onPress={logout}

            >

            </CustomButton>
        </SafeArea>
    );
};


export default ChatScreen;