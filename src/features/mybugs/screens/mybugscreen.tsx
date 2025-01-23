import React, { useState } from 'react';
import { FlatList, Pressable, View, TextInput, Text, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useBug } from '@src/services/bugs/bugs.context';
import { BugsNavigationType } from '@src/infrastracture/navigation/types';
import Bug from '../components/bug';
import { IBug } from 'types';
import { SafeArea } from '@src/components/main.style';
import { theme } from '@src/theme';

const MyBugsScreen = () => {
    const { bugs, refreshBugs } = useBug(); // Context'ten verileri alıyoruz
    const [isChecked, setIsChecked] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation<BugsNavigationType>();

    // Filtreleme işlemi
    const filteredData = bugs?.filter((bug) => {
        const matchesSearchQuery =
            bug.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bug.language.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesIsChecked = !isChecked || bug.isFixed; // Checkbox durumu
        return matchesSearchQuery && matchesIsChecked;
    });

    const renderItem = ({ item }: { item: IBug }) => (
        <Pressable onPress={() => navigation.navigate('BugDetail', { bug: item })}>
            <Bug bug={item} />
        </Pressable>
    );

    return (
        <SafeArea edges={["top"]} color={theme.colors.ui.tertiary}>


            <View style={styles.container}>
                {/* Filtre ve Checkbox */}
                <View style={styles.filterRow}>
                    <Pressable style={styles.filterButton}>
                        <View style={styles.filterContent}>
                            <Text style={styles.filterText}>Filtre</Text>
                            <AntDesign name="filter" size={20} color="black" />
                        </View>
                        <Pressable onPress={() => setIsChecked(!isChecked)}>
                            <View style={styles.checkboxWrapper}>
                                {isChecked ? (
                                    <FontAwesome6 name="square-check" size={23} color="black" />
                                ) : (
                                    <Feather name="square" size={24} color="black" />
                                )}
                            </View>
                        </Pressable>
                    </Pressable>
                </View>

                {/* Arama Çubuğu */}
                <View style={styles.searchRow}>
                    <FontAwesome5 name="search" size={20} color="gray" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)}
                    />
                </View>

                {/* Liste */}
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeArea>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    filterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#d1d1d1',
        padding: 10,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    filterContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    filterText: {
        fontSize: 18,
        marginRight: 5,
        color: 'black',
    },
    checkboxWrapper: {
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#d1d1d1',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: 10,
        paddingLeft: 10,
    },
    listContainer: {
        paddingHorizontal: 10,
    },
    itemSeparator: {
        height: 14,
    },
});

export default MyBugsScreen;
