import { FlatList, Pressable, View, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { IBug } from '../../types';
import { fetcher } from '../../service/config';
import Loader from '../../src/shared/loader';
import Bug from '../../src/components/bug';
import SafeAreaWraper from '../../src/shared/safe-area-wrapper';
import { Box, Text } from '../../utils/theme';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { BugsNavigationType } from '../../navigation/types';

const MyBugsScreen = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const navigation = useNavigation<BugsNavigationType>();

    const { data, isLoading, error } = useSWR<IBug[]>(
        "api/errors/getMyErrors",
        fetcher, {
        refreshInterval: 10000,
    });

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        console.error('Error fetching data:', error);
        return (
            <SafeAreaWraper>
                <Box flex={1} px="4" justifyContent="center" alignItems="center">
                    <Text variant="textLg" fontWeight="700" mb="10" color="blu900">
                        Failed to load bugs. Please try again later.
                    </Text>
                </Box>
            </SafeAreaWraper>
        );
    }


    const filteredData = data?.filter(bug => {
        const matchesSearchQuery = bug.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bug.language.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesIsChecked = !isChecked || bug.isFixed;
        return matchesSearchQuery && matchesIsChecked;
    });

    const renderItem = ({ item }: { item: IBug }) => (
        <Pressable onPress={() => navigation.navigate('BugDetail', { bug: item })}>
            <Bug bug={item} />
        </Pressable>
    );

    return (
        <SafeAreaWraper>
            <Box bg="zinc400" flexDirection="row" alignItems="center">
                <Pressable>
                    <Box ml="10" mt="3" width={140} height={40} borderRadius="rounded-5xl" bg="gray250" flexDirection="row" alignItems="center">
                        <Box m="2" ml="6" flexDirection="row" alignItems="center">
                            <Text fontSize={18} mr="3">Filtre</Text>
                            <AntDesign name="filter" size={20} color="black" />
                        </Box>
                        <Pressable onPress={() => setIsChecked(!isChecked)}>
                            <Box ml="13" m="2" justifyContent="center" alignItems="center">
                                {isChecked ? (
                                    <FontAwesome6 name="square-check" size={23} color="black" />
                                ) : (
                                    <Feather name="square" size={24} color="black" />
                                )}
                            </Box>
                        </Pressable>
                    </Box>
                </Pressable>
            </Box>

            <Box bg="zinc400" width={600} height={15} />
            <Box flexDirection="row" bg="zinc400" px="4" alignItems="center">
                <FontAwesome5 name="search" size={20} color="gray" />
                <TextInput
                    style={{
                        flex: 1,
                        height: 40,
                        borderColor: 'gray',
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
            <Box bg="zinc400" width={600} height={30} />
            <Box bg="zinc400" flex={1} >
                <Box ml="5" mr="5">
                    <FlatList
                        data={filteredData}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderItem}
                        ItemSeparatorComponent={() => <Box height={14} />}
                        keyExtractor={(item) => item._id}
                    />
                </Box>
            </Box>
        </SafeAreaWraper>
    );
};

export default MyBugsScreen;