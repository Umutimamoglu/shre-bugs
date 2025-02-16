import React, { useState } from 'react';
import { Pressable, TextInput, Image, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Box, Text, Theme } from '../../utils/theme';
import SafeAreaWrapper from '../../src/shared/safe-area-wrapper';
import Button from '../../src/shared/button';
import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import axiosInstance, { BASE_URL } from '../../service/config';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { CreateError, ICreateErrorRequest, IColor } from '../../types';
import { launchImageLibrary, launchCamera, ImagePickerResponse, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import { getColors } from '../../utils/heplers';
import { AuthScreenNavigationType, CategoriesStackParamList, RootBottomTabParamList } from '../../navigation/types';
import SearchableDropdown from 'react-native-searchable-dropdown';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const COLORS = getColors();
const PROGRAMMING_LANGUAGES = [
    { id: 1, name: 'JavaScript' },
    { id: 2, name: 'Python' },
    { id: 3, name: 'Java' },
    { id: 4, name: 'C#' },
    { id: 5, name: 'C++' },
];

const ERROR_TYPES = [
    { id: 1, name: 'Compilation Errors' },
    { id: 2, name: 'Runtime Errors' },
    { id: 3, name: 'Arithmetic Errors' },
    { id: 4, name: 'Resource Errors' },
    { id: 5, name: 'Code Smells' },
    { id: 6, name: 'Golden Hammer' },
    { id: 7, name: 'Analysis Paralysis' }
];

const DEFAULT_COLOR = COLORS[0];
const DEFAULT_LANGUAGE = PROGRAMMING_LANGUAGES[0];
const DEFAULT_ERROR = ERROR_TYPES[0];

const CreateErrorRequest = async (
    url: string,
    { arg }: { arg: FormData }
) => {
    try {
        const response = await axiosInstance.post(url, arg, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

    } catch (error) {
        if (axios.isAxiosError(error)) {

        } else {
            console.log('Unexpected error:', error);
        }
        throw error;
    }
};

type CreateErrorRouteTypes = RouteProp<
    CategoriesStackParamList,
    'CreateCategory'
>;

function HomeScreen() {

    const navigation = useNavigation<NativeStackNavigationProp<RootBottomTabParamList, "MyBugs">>();

    const navigateToMyBugsScreen = () => {
        navigation.navigate("MyBugs", { screen: 'Bugs' });
    };

    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedErrorType, setSelectedErrorType] = useState('');
    const [image, setImage] = useState<string>('');
    const theme = useTheme<Theme>();

    const { trigger } = useSWRMutation(
        'api/errors/create',
        CreateErrorRequest
    );


    const color: IColor = DEFAULT_COLOR;


    const { mutate } = useSWRConfig();
    const [newError, setNewError] = useState<CreateError>({
        name: '',
        color,
        language: DEFAULT_LANGUAGE.name,
        isFixed: false,
        image: undefined,
        type: DEFAULT_ERROR.name,
        howDidIFix: "Bos"
    });

    const updateErrorType = (errorType: string | null | undefined) => {
        const validErrorType = errorType || DEFAULT_ERROR.name;
        setNewError(prev => ({ ...prev, type: validErrorType }));
    };

    const createNewError = async () => {
        console.log('createNewError called');
        try {
            const formData = new FormData();
            formData.append('name', newError.name);


            formData.append('color[id]', newError.color?.id || DEFAULT_COLOR.id);
            formData.append('color[name]', newError.color?.name || DEFAULT_COLOR.name);
            formData.append('color[code]', newError.color?.code || DEFAULT_COLOR.code);

            formData.append('isFixed', newError.isFixed.toString());
            formData.append('language', newError.language);
            formData.append('type', newError.type);
            formData.append('howDidIFix', newError.howDidIFix);

            if (image) {
                formData.append('image', {
                    uri: image,
                    name: 'photo.jpg',
                    type: 'image/jpeg'
                } as any);
            }

            await trigger(formData);
            await mutate(BASE_URL + 'api/errors/create');

            navigateToMyBugsScreen();
        } catch (error) {
            throw error;
        }
    };





    const updateColor = (selectedColor: IColor) => {
        setNewError((prev) => ({
            ...prev,
            color: selectedColor,
        }));
    };

    const updateLanguage = (language: string) => {
        setNewError((prev) => ({
            ...prev,
            language,
        }));
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

            } else if (response.assets) {
                const source = response.assets[0]?.uri || '';
                setImage(source);
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
                setImage(source);
            }
        });
    };

    return (
        <SafeAreaWrapper>
            <Box flex={1} bg="zinc400">
                <Box flex={1} mx="6" justifyContent="center">
                    <Text variant="textXl" textAlign="center" mb="4">
                        Yeni hata oluştur!!!
                    </Text>
                    <Box alignItems="center" mb="2">
                        <Pressable onPress={selectImageFromLibrary} style={styles.pressable}>
                            <MaterialIcons name="photo-library" size={24} color="black" />
                            <Text>Galeri</Text>
                        </Pressable>

                    </Box>
                    <Box bg="gray250" borderRadius="rounded-2xl" mb="4">
                        <SearchableDropdown
                            onItemSelect={(item) => {
                                setSelectedLanguage(item.name);
                                updateLanguage(item.name);
                            }}
                            containerStyle={{ padding: 5 }}
                            textInputStyle={{
                                fontSize: 15,
                                lineHeight: 18,
                                padding: 12,
                                borderWidth: 1,
                                borderColor: 'gray.500',
                                backgroundColor: '#FAF7F6',
                            }}
                            itemStyle={{
                                padding: 10,
                                marginTop: 2,
                                backgroundColor: '#FAF9F8',
                                borderColor: 'gray.500',
                                borderWidth: 1,
                            }}
                            itemTextStyle={{
                                color: 'blue.800',
                            }}
                            itemsContainerStyle={{ maxHeight: 140 }}
                            items={PROGRAMMING_LANGUAGES}
                            defaultIndex={0}
                            placeholder="Yazılım dili seçin"
                            resetValue={false}
                            underlineColorAndroid="transparent"
                            textInputProps={{
                                value: selectedLanguage
                            }}
                        />
                    </Box>
                    <Box p="1" />
                    <Box bg="gray250" borderRadius="rounded-2xl" mb="4">
                        <SearchableDropdown
                            onItemSelect={(item) => {
                                setSelectedErrorType(item.name);
                                updateErrorType(item.name);
                            }}
                            containerStyle={{ padding: 5 }}
                            textInputStyle={{
                                fontSize: 15,
                                lineHeight: 18,
                                padding: 12,
                                borderWidth: 1,
                                borderColor: 'gray.500',
                                backgroundColor: '#FAF7F6',
                            }}
                            itemStyle={{
                                padding: 10,
                                marginTop: 2,
                                backgroundColor: '#FAF9F8',
                                borderColor: 'gray.500',
                                borderWidth: 1,
                            }}
                            itemTextStyle={{
                                color: 'blue.800',
                            }}
                            itemsContainerStyle={{ maxHeight: 140 }}
                            items={ERROR_TYPES}
                            defaultIndex={0}
                            placeholder="Hata tipini seçiniz"
                            resetValue={false}
                            underlineColorAndroid="transparent"
                            textInputProps={{
                                value: selectedErrorType
                            }}
                        />
                    </Box>

                    <Box bg="gray250" borderRadius="rounded-2xl" mb="4">
                        <TextInput
                            style={{
                                fontSize: 15,
                                lineHeight: 19,
                                padding: 12,
                            }}
                            value={newError.name}
                            maxLength={36}
                            placeholder="Hatanıza isim verin"
                            placeholderTextColor={theme.colors.gray5}
                            onChangeText={(text) => {
                                setNewError((prev) => ({
                                    ...prev,
                                    name: text,
                                }));
                            }}
                        />
                    </Box>
                    <Box bg="gray250" p="4" borderRadius="rounded-2xl" mb="4">
                        <Box
                            style={{
                                backgroundColor: newError.color?.code,
                            }}
                            width={60}
                            p="2"
                            mb="4"
                            borderRadius="rounded-2xl"
                            alignItems="center"
                        >
                            <Text
                                variant="textXs"
                                fontWeight="600"
                                style={{ color: "#ffff" }}
                            >
                                Colors
                            </Text>
                        </Box>

                        <Box flexDirection="row" justifyContent="space-evenly">
                            {COLORS.map((_color: IColor) => (
                                <Pressable
                                    key={_color.id}
                                    onPress={() => {
                                        updateColor(_color);
                                    }}
                                >
                                    <Box
                                        style={{
                                            backgroundColor: _color.code,
                                            borderColor: newError.color?.id === _color.id ? 'black' : 'transparent',
                                            borderWidth: 2,
                                        }}
                                        width={24}
                                        height={24}
                                        borderRadius="rounded-2xl"
                                    ></Box>
                                </Pressable>
                            ))}
                        </Box>
                    </Box>
                    <Box mb="1" alignItems='center'>
                        <Button
                            label="Hata Ekle"
                            onPress={() => {

                                createNewError();
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </SafeAreaWrapper>
    );
}


const styles = StyleSheet.create({
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        padding: 10,
        backgroundColor: 'lightgray',
        borderRadius: 5,
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
    },
});

export default HomeScreen;



