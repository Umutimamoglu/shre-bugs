import React, { useState } from 'react';
import { View, FlatList, TextInput, Pressable, StyleSheet } from 'react-native';
import useSWR from 'swr';
import { IAllBugs } from '../../types';
import { fetcher } from '../../service/config';
import AllBug from '../../src/components/allBug';
import { Box, Text } from '../../utils/theme';
import SafeAreaWrapper from '../../src/shared/safe-area-wrapper';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { useNavigation } from '@react-navigation/native';
import { AllBugsNavigationType } from '../../navigation/types';
import NavigateBack from '../../src/shared/navigate-back';

const FeedScreen = () => {
    const navigation = useNavigation<AllBugsNavigationType>();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBug, setSelectedBug] = useState<IAllBugs | null>(null);

    const { data, isLoading, error } = useSWR<IAllBugs[]>(
        "api/errors/getAllErrors",
        fetcher, {
        refreshInterval: 10000,
    });

    if (isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View>
                <Text>Error: {error.message}</Text>
            </View>
        );
    }

    const filteredData = data?.filter(bug =>
        bug.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bug.language.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItem = ({ item }: { item: IAllBugs }) => (
        <Pressable onPress={() => setSelectedBug(item)}>
            <AllBug bug={item} />
            {selectedBug?._id === item._id && <Text>(Seçili)</Text>}
        </Pressable>
    );

    const goToFavoriBugsScreen = () => {
        navigation.navigate("FavoriBugs");
    };

    return (
        <SafeAreaWrapper>
            <Box bg="zinc400" flex={1}>
                <Box flex={1} flexDirection="row" alignItems="center" justifyContent="space-between" mt="5" mb="4">
                    {/* Hata Akış Metni */}

                    <NavigateBack />

                    <Text variant="textLg" textAlign='center' style={{ flex: 1 }}>
                        Hata Akış
                    </Text>

                    {/* Buton */}
                    <Pressable style={styles.button} onPress={goToFavoriBugsScreen}>
                        <Text style={styles.buttonText}>Favoriler</Text>
                    </Pressable>
                </Box>

                <Box flex={9}>
                    <Box flexDirection="row" bg="zinc400" px="4" alignItems="center">
                        <FontAwesome5 name="search" size={20} color="gray" />
                        <TextInput
                            style={{
                                flex: 1,
                                height: 40,
                                borderColor: 'gray',
                                backgroundColor: "white",
                                borderWidth: 1,
                                borderRadius: 10,
                                marginLeft: 10,
                                paddingLeft: 10,
                            }}
                            placeholder="Search..."
                            value={searchQuery}
                            onChangeText={text => setSearchQuery(text)}
                        />
                    </Box>

                    <Box ml="6" mr="6" mt="4">
                        <FlatList
                            data={filteredData}
                            renderItem={renderItem}
                            keyExtractor={(item) => item._id}
                            ItemSeparatorComponent={() => <Box height={14} />}
                        />
                    </Box>
                </Box>
            </Box>
        </SafeAreaWrapper>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#ef4444', // Butonun arka plan rengi
        paddingVertical: 8, // Dikey iç dolgu
        paddingHorizontal: 12, // Yatay iç dolgu
        borderRadius: 8, // Köşelerin yuvarlaklığı
        alignItems: 'center', // Metni ortalar
        justifyContent: 'center', // İçeriği ortalar
        alignSelf: 'center', // Butonun kendisini ortalar
        width: 150, // Butonun genişliği
        height: 40, // Butonun yüksekliği
    },
    buttonText: {
        color: '#FFFFFF', // Metnin rengi
        fontSize: 14, // Metnin boyutu
        fontWeight: 'bold', // Metnin kalınlığı
    },
});

export default FeedScreen;
