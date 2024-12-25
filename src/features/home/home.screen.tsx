import React, { useEffect, useState } from 'react';
import { Pressable, TextInput, StyleSheet, View, Text, Dimensions } from 'react-native';
import useSWRMutation from 'swr/mutation';
import { MaterialIcons } from '@expo/vector-icons';
import { BASE_URL } from "@src/services/connections";

import { CreateError, IColor } from "types";
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import DropDownPicker from "react-native-dropdown-picker";
import { useSWRConfig } from 'swr';
import { getColors } from "src/heplers";

import { ERROR_TYPES, PROGRAMMING_LANGUAGES } from "src/constants/data";
import { axiosInstance } from '@src/services/account/account.service';
const { width, height } = Dimensions.get('window');
const COLORS = getColors();




const CreateErrorRequest = async (url: string, { arg }: { arg: FormData }) => {
    try {
        await axiosInstance.post(url, arg, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

function HomeScreen() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(PROGRAMMING_LANGUAGES.map((lang) => ({ label: lang.name, value: lang.name })));

    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedErrorType, setSelectedErrorType] = useState('');
    const [selectedColor, setSelectedColor] = useState<IColor>(COLORS[0]);
    const [image, setImage] = useState<string>('');
    const { trigger } = useSWRMutation('api/errors/create', CreateErrorRequest);
    const { mutate } = useSWRConfig();
    const [newError, setNewError] = useState<CreateError>({
        name: '',
        color: COLORS[0], // IColor türünde
        language: selectedLanguage,
        isFixed: false,
        image: undefined,
        type: selectedErrorType,
        howDidIFix: '', // Ekleyin ve başlangıçta boş bırakın
    });
    const createNewError = async () => {
        try {
            const formData = new FormData();
            formData.append('name', newError.name);
            formData.append('color[id]', selectedColor.id); // Renk ID'si
            formData.append('color[name]', selectedColor.name); // Renk adı
            formData.append('color[code]', selectedColor.code); // Renk kodu
            formData.append('isFixed', newError.isFixed.toString());
            formData.append('language', newError.language);
            formData.append('type', newError.type);
            formData.append('howDidIFix', newError.howDidIFix || 'Not specified');
            if (image) {
                formData.append('image', {
                    uri: image,
                    name: 'photo.jpg',
                    type: 'image/jpeg',
                } as any);
            }

            console.log('Form Data Gönderiliyor:', formData);

            await trigger(formData);
            await mutate(BASE_URL + 'api/errors/create');
        } catch (error) {
            console.error('Error creating new error:', error);
        }
    };
    const selectImageFromLibrary = async () => {
        const options: ImageLibraryOptions = { mediaType: 'photo', quality: 1 };
        launchImageLibrary(options, (response) => {
            if (response.assets) {
                const source = response.assets[0]?.uri || '';
                setImage(source);
            }
        });
    };

    useEffect(() => {
        if (value) {
            setSelectedLanguage(value); // Seçilen dil state'ini günceller
            setNewError((prev) => ({ ...prev, language: value })); // `newError` state'ini günceller
        }
    }, [value]);
    return (
        <View style={styles.container}>
            {/* Card View Container */}
            <View style={styles.card}>
                <Text style={styles.title}>Yeni hata ekle!!!</Text>

                <View style={styles.imagePickerContainer}>
                    <Pressable onPress={selectImageFromLibrary} style={styles.imagePickerButton}>
                        <MaterialIcons name="photo-library" size={24} color="black" />
                        <Text style={styles.imagePickerText}>Galeri</Text>
                    </Pressable>
                </View>

                {/* Programlama Dili Seçici */}
                <View style={styles.dropdownContainer}>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder="Yazılım dili seçin"
                        style={styles.dropdown}
                        dropDownContainerStyle={styles.dropdownContainer}
                        placeholderStyle={styles.placeholder}
                        labelStyle={styles.label}
                    />
                </View>


                {/* Hata Türü Seçici
                <View style={styles.dropdownContainer}>
                    <SearchableDropdown
                        onItemSelect={(item: { id: number; name: string }) => {
                            setSelectedErrorType(item.name);
                            setNewError((prev) => ({ ...prev, type: item.name }));
                        }}
                        items={ERROR_TYPES}
                        containerStyle={{ padding: 5 }}
                        textInputStyle={styles.textInput}
                        itemStyle={styles.dropdownItem}
                        itemTextStyle={{ color: '#000' }}
                        placeholder={selectedErrorType || "Hata tipini seçiniz"} // 
                        resetValue={false}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#000"
                    />
                </View>
 */}
                {/* Hata Adı Girişi */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Hata Adı"
                        value={newError.name}
                        onChangeText={(text) => setNewError((prev) => ({ ...prev, name: text }))}
                        placeholderTextColor="#000"
                    />
                </View>

                <View style={styles.colorPickerContainer}>
                    <View style={[styles.colorLabel, { backgroundColor: selectedColor.code }]}>
                        <Text style={styles.colorLabelText}>Colors</Text>
                    </View>
                    <View style={styles.colors}>
                        {COLORS.map((_color: IColor) => (
                            <Pressable
                                key={_color.id}
                                onPress={() => {
                                    setSelectedColor(_color);
                                    setNewError((prev) => ({
                                        ...prev,
                                        color: { id: _color.id, name: _color.name, code: _color.code }, // Renk nesnesi
                                    }));
                                }}
                            >
                                <View
                                    style={[
                                        styles.colorCircle,
                                        {
                                            backgroundColor: _color.code,
                                            borderWidth: _color.name === selectedColor.name ? 2 : 0,
                                            borderColor: '#000',
                                        },
                                    ]}
                                />
                            </Pressable>
                        ))}
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable
                        onPress={createNewError}

                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed ? '#ddd' : '#FF5733',
                            },
                            styles.button,
                        ]}
                    >
                        <Text style={styles.buttonText}>Hata Ekle</Text>
                    </Pressable>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    dropdown: {
        borderWidth: 1,
        borderColor: '#d3d3d3',
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 40,
    },
    dropdownContainer: {
        borderWidth: 1,
        borderColor: '#d3d3d3',
        borderRadius: 8,
    },
    placeholder: {
        color: '#999',
    },
    label: {
        fontSize: 16,
        color: '#000',
    },
    container: {
        flex: 1,
        marginTop: 0,
        alignItems: 'center',
        padding: 16,

        backgroundColor: '#f3d8f8',
    },
    card: {
        gap: 9,
        width: width * 0.9,
        height: height * 0.76,
        backgroundColor: '#fff',
        marginTop: 0,
        borderRadius: 10,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        shadowOpacity: 0.2,
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 16,
        fontWeight: 'bold',
    },
    imagePickerContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    imagePickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#d3d3d3',
        borderRadius: 5,
    },
    imagePickerText: {
        marginLeft: 8,
    },
    inputContainer: {
        backgroundColor: '#f5f5f5',
        padding: 8,
        borderRadius: 8,
        marginBottom: 16,
    },
    input: {
        fontSize: 16,
        padding: 8,
        borderWidth: 1,
        borderColor: '#d3d3d3',
        borderRadius: 5,
    },

    textInput: {
        fontSize: 15,
        padding: 12,
        backgroundColor: '#FAF7F6',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
    },
    dropdownItem: {
        padding: 10,
        backgroundColor: '#FAF9F8',
        borderColor: 'gray',
        borderWidth: 1,
    },
    colorPickerContainer: {
        padding: 8,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        marginBottom: 16,
    },
    colorLabel: {
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 4,
        alignSelf: 'flex-start',
    },
    colorLabelText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    colors: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 8,
    },
    colorCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 16,
    },
    button: {
        padding: 15,

        backgroundColor: '#e57373',

        width: width * 0.8,
        height: height * 0.06,
        borderRadius: 20,
        alignItems: 'center'
        ,
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default HomeScreen;