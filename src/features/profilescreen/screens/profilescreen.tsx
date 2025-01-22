import { View, Image, StyleSheet, Text, TextInput, Dimensions, Platform, PermissionsAndroid, Pressable } from 'react-native';
import React, { useState } from 'react';

import { launchImageLibrary, launchCamera, ImagePickerResponse, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';

import { MaterialIcons } from '@expo/vector-icons';
import { SafeArea } from '@src/components/main.style';
import { theme } from '@src/theme';

const ProfileScreen = () => {

    const { width, height } = Dimensions.get('window');



    return (
        <SafeArea edges={[]} color={theme.colors.ui.secondary}>
            <Text>
                profile screeennnnnn
            </Text>
        </SafeArea>
    );
};


export default ProfileScreen;