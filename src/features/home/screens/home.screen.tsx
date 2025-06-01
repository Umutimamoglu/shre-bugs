import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { CreateBugPayload, IColor } from "types";
import { getColors } from "src/heplers";
import * as ImagePicker from "expo-image-picker";
import { PROGRAMMING_LANGUAGES, BUG_TYPES } from "src/constants/data";
import { SafeArea } from "@src/components/main.style";
import {
    ButtonText,
    CardContainer,
    ColorCircle,
    ColorLabel,
    ColorLabelText,
    ColorPickerContainer,
    ColorsContainer,
    DropdownContainer,
    HeaderContainerHome,
    HomeMainContainer,
    ImagePickerButton,
    ImagePickerContainer,
    LabelText,
    StyledDropDownPicker,
    StyledPressableButton,
    TextInputStyled,
    TitleText,
} from "../components/home.styled";
import { theme } from "@src/theme";
import { useBug } from "@src/services/bugs/bugs.context";
import { BackButton, HeaderContainer, HeaderTitle } from "@src/features/allbugfeed/components/feed.Styled";

import { useNavigation } from '@react-navigation/native';
import { AllBugsNavigationType } from "@src/infrastracture/navigation/types";
import { useNotification } from "@src/hooks/NotificationContext";



const COLORS = getColors();

function HomeScreen() {
    const { createBug } = useBug(); // Bug context kullanımı
    const navigation = useNavigation<AllBugsNavigationType>();

    const [languageOpen, setLanguageOpen] = useState(false);
    const [languageValue, setLanguageValue] = useState<string | null>(null);
    const [languageItems, setLanguageItems] = useState(
        PROGRAMMING_LANGUAGES.map((lang) => ({ label: lang.name, value: lang.name }))
    );

    const [bugTypeOpen, setBugTypeOpen] = useState(false);
    const [bugTypeValue, setBugTypeValue] = useState<string | null>(null);
    const [bugTypeItems, setBugTypeItems] = useState(
        BUG_TYPES.map((bug) => ({ label: bug.name, value: bug.name }))
    );

    const [selectedColor, setSelectedColor] = useState<IColor>(COLORS[0]);
    const [image, setImage] = useState<string>("");
    const { expoPushToken, notification, error } = useNotification();

    const [newBug, setNewBug] = useState<CreateBugPayload>({
        name: "",
        color: COLORS[0],
        language: "",
        isFixed: false,
        image: undefined,
        type: "",
        howDidIFix: "",
    });



    const createNewBug = async () => {
        try {
            await createBug({
                ...newBug,
                color: selectedColor,
                image: image
                    ? {
                        uri: image,
                        name: "photo.jpg",
                        type: "image/jpeg",
                    }
                    : undefined,
            });
            console.log("Bug successfully created");
        } catch (error) {
            console.error("Error creating bug:", error);
        }
    };


    const selectImageFromLibrary = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
            alert("Media library permissions are required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            console.log("Selected Image URI:", result.assets[0].uri);
        }
    };


    useEffect(() => {
        if (languageValue) {
            setNewBug((prev) => ({ ...prev, language: languageValue }));
        }
    }, [languageValue]);

    useEffect(() => {
        if (bugTypeValue) {
            setNewBug((prev) => ({ ...prev, type: bugTypeValue }));
        }
    }, [bugTypeValue]);

    const goToİnfo = () => {
        navigation.navigate("FavoriBugs");
    };



    return (
        <SafeArea edges={["top"]} color={theme.colors.ui.tertiary2}>
            <ScrollView>


                <HeaderContainerHome>
                    <BackButton onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name="bug" size={36} color="#000" />
                    </BackButton>
                    <HeaderTitle>Hata Ekle</HeaderTitle>
                    <TouchableOpacity onPress={goToİnfo}>
                        <MaterialCommunityIcons name="information" size={36} color="black" />

                    </TouchableOpacity>
                </HeaderContainerHome>
                <HomeMainContainer>


                    <CardContainer>
                        <LabelText>Galeriye git veya kameranı kullan
                            !
                        </LabelText>
                        <ImagePickerContainer>
                            <ImagePickerButton onPress={selectImageFromLibrary}>
                                <MaterialIcons name="photo-library" size={24} color="#A5616C" />
                                <Text> {" Galeri"} </Text>
                            </ImagePickerButton>
                        </ImagePickerContainer>

                        <DropdownContainer style={{ zIndex: 3000 }}>
                            <StyledDropDownPicker
                                open={languageOpen}
                                value={languageValue}
                                items={languageItems}
                                setOpen={setLanguageOpen}
                                setValue={setLanguageValue}
                                setItems={setLanguageItems}
                                placeholder="Yazılım dili seçin"
                                zIndex={3000}
                                zIndexInverse={1000}
                            />
                        </DropdownContainer>

                        {/* Bug Türü Seçici */}
                        <DropdownContainer style={{ zIndex: 2000 }}>
                            <StyledDropDownPicker
                                open={bugTypeOpen}
                                value={bugTypeValue}
                                items={bugTypeItems}
                                setOpen={setBugTypeOpen}
                                setValue={setBugTypeValue}
                                setItems={setBugTypeItems}
                                placeholder="Bug türünü seçiniz"
                                zIndex={2000}
                                zIndexInverse={1000}
                            />
                        </DropdownContainer>

                        <TextInputStyled
                            placeholder="Bug'a isim veriniz"
                            value={newBug.name}
                            onChangeText={(text: string) =>
                                setNewBug((prev) => ({
                                    ...prev,
                                    name: text,
                                }))
                            }
                            placeholderTextColor={theme.colors.text.primary}
                            keyboardType="default"
                        />

                        <ColorPickerContainer>
                            <ColorLabel backgroundColor={selectedColor.code}>
                                <ColorLabelText>Colors</ColorLabelText>
                            </ColorLabel>
                            <ColorsContainer>
                                {COLORS.map((_color: IColor) => (
                                    <Pressable
                                        key={_color.id}
                                        onPress={() => {
                                            setSelectedColor(_color);
                                            setNewBug((prev) => ({
                                                ...prev,
                                                color: { id: _color.id, name: _color.name, code: _color.code },
                                            }));
                                        }}
                                    >
                                        <ColorCircle
                                            backgroundColor={_color.code}
                                            isSelected={_color.name === selectedColor.name}
                                        />
                                    </Pressable>
                                ))}
                            </ColorsContainer>
                        </ColorPickerContainer>

                        <StyledPressableButton onPress={createNewBug}>
                            <ButtonText>
                                Yeni Hata Ekle
                            </ButtonText>
                        </StyledPressableButton>
                    </CardContainer>
                    {notification && (
                        <CardContainer style={{ marginTop: 20, backgroundColor: "#fff3f0", padding: 16, borderRadius: 8 }}>
                            <Text style={{ fontWeight: "bold", marginBottom: 8 }}>📬 Bildirim Alındı</Text>
                            <Text style={{ marginBottom: 4 }}>🎯 Push Token:</Text>
                            <Text selectable style={{ color: "gray" }}>{expoPushToken}</Text>

                            <Text style={{ marginTop: 8 }}>📝 Başlık: {notification?.request.content.title}</Text>

                            <Text style={{ marginTop: 8 }}>📦 Veri:</Text>
                            <Text selectable style={{ fontSize: 12, color: "gray" }}>
                                {JSON.stringify(notification?.request.content.data, null, 2)}
                            </Text>
                        </CardContainer>
                    )}
                </HomeMainContainer>
            </ScrollView>
        </SafeArea>
    );
}

export default HomeScreen;



/**
 
  return (
        <View style={styles.container}>
             <View style={styles.card}>
                <Text style={styles.title}>Yeni hata ekle!!!</Text>

                <View style={styles.imagePickerContainer}>
                    <Pressable onPress={selectImageFromLibrary} style={styles.imagePickerButton}>
                        <MaterialIcons name="photo-library" size={24} color="black" />
                        <Text style={styles.imagePickerText}>Galeri</Text>
                    </Pressable>
                </View>

             
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

        backgroundColor: '#f8f8f8',
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
 */