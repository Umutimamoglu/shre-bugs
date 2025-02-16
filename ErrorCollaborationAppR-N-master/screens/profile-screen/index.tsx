import { View, Image, StyleSheet, Text, TextInput, Dimensions, Platform, PermissionsAndroid, Pressable } from 'react-native';
import React, { useState } from 'react';
import SafeAreaWraper from '../../src/shared/safe-area-wrapper';
import useUserGlobalStore from '../../store/useUserGlobalStore';
import { herImage } from "../../assets/index";
import Button from '../../src/shared/button';
import axiosInstance from '../../service/config';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { launchImageLibrary, launchCamera, ImagePickerResponse, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';

import { MaterialIcons } from '@expo/vector-icons';

const ProfileScreen = () => {

    const { width, height } = Dimensions.get('window');

    const user = useUserGlobalStore(state => state.user);
    const updateUser = useUserGlobalStore(state => state.updateUser);

    const [userName, setuserName] = useState(user!.name);
    const [userImage, setuserImage] = useState(user?.image || '');
    const [positionTitle, setpositionTitle] = useState(user?.positionTitle);

    const handleLogout = () => {
        updateUser(null);
    };

    const requestCameraPermission = async () => {
        if (Platform.OS === 'ios') {
            const result = await request(PERMISSIONS.IOS.CAMERA);
            return result === RESULTS.GRANTED;
        } else {
            const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
            return result === PermissionsAndroid.RESULTS.GRANTED;
        }
    };
    const requestStoragePermission = async () => {
        if (Platform.OS === 'ios') {
            const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
            return result === RESULTS.GRANTED;
        } else {
            const result = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
            );
            return result === PermissionsAndroid.RESULTS.GRANTED;
        }
    };

    const selectImageFromLibrary = async () => {
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) return;

        const options: ImageLibraryOptions = { mediaType: 'photo', quality: 1 };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image selection');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorCode);
            } else if (response.assets) {
                const source = response.assets[0]?.uri || '';
                setuserImage(source);
            }
        });
    };

    const captureImage = async () => {
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) return;

        const options: CameraOptions = { mediaType: 'photo', quality: 1 };
        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image capture');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorCode);
            } else if (response.assets) {
                const source = response.assets[0]?.uri || '';
                setuserImage(source);
            }
        });
    };


    const updateProfile = async () => {
        try {
            const formData = new FormData();
            formData.append('name', userName || '');
            formData.append('positionTitle', positionTitle || '');
            formData.append('email', user?.email || '');
            if (userImage) {
                formData.append('image', {
                    uri: userImage,
                    name: 'profile.jpg',
                    type: 'image/jpeg'
                } as any);
            }
            const response = await axiosInstance.put('/api/errors/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {

                console.log('Profile updated successfully');
                updateUser({
                    ...user,
                    name: userName || '',
                    image: userImage || '',
                    positionTitle: positionTitle || '',
                    email: user?.email || '',
                    _id: user?._id || '',
                });
            } else {
                console.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error while updating profile:', error);
        }
    };

    return (
        <SafeAreaWraper>
            <View style={styles.container}>
                {user ? (
                    <View style={styles.centered}>
                        <View style={styles.imageContainer}>
                            {userImage ? (
                                <Image source={{ uri: userImage }} style={styles.profileImage} />
                            ) : (
                                <Image source={herImage} style={styles.profileImage} />
                            )}
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{user.name}</Text>
                            <Text style={styles.userEmail}>{user.email}</Text>
                        </View>
                    </View>
                ) : (
                    <Text style={styles.noUserText}>
                        No user data available
                    </Text>
                )}

                <Pressable onPress={selectImageFromLibrary} style={styles.pressable}>
                    <MaterialIcons name="photo-library" size={24} color="black" />
                    <Text>Galeriden Seç</Text>
                </Pressable>
                <Pressable onPress={captureImage} style={styles.pressable}>
                    <MaterialIcons name="photo-camera" size={24} color="black" />
                    <Text>Fotoğraf Çek</Text>
                </Pressable>

                <TextInput
                    style={[
                        styles.textInput,
                        { width: width * 0.8, height: height * 0.05 }
                    ]}
                    value={userName}
                    onChangeText={setuserName}
                />
                <TextInput
                    style={[
                        styles.textInput,
                        { width: width * 0.8, height: height * 0.05 }
                    ]}
                    value={positionTitle}
                    onChangeText={setpositionTitle}
                />

                <Button label='Profili Güncelle' onPress={updateProfile} />
                <Button label='Çıkış Yap' onPress={handleLogout} />
            </View>
        </SafeAreaWraper>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        marginBottom: 16,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    userInfo: {
        alignItems: 'center',
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 16,
        color: 'gray',
    },
    noUserText: {
        fontSize: 18,
        textAlign: 'center',
    },
    textInput: {
        marginHorizontal: 1,
        fontSize: 20,
        justifyContent: 'center',
        marginLeft: 20,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 2,           // Çizgi kalınlığı
        borderColor: '#3F3C3C',   // Çizgi rengi
    },
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        padding: 10,
        backgroundColor: 'lightgray',
        borderRadius: 5,
    },

});
export default ProfileScreen;