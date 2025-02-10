import React, { useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import styled from 'styled-components/native';

import { IAllBugs, IBug } from 'types';
import { SafeArea } from '@src/components/main.style';
import { theme } from '@src/theme';


import { useBug } from '@src/services/bugs/bugs.context';
import { CheckboxWrapper, Container, FilterButton, FilterRow, FilterText, ItemSeparator, ListContainer, SearchInput, SearchRow } from '../components/favori.styled';
import { AllBugsNavigationType } from '@src/infrastracture/navigation/types';
import FavoriBug from '../components/favoriBug';



const FavoriBugsScreen = () => {
    const { allBugs, isLoading, error, refreshAllBugs } = useBug();
    const [isChecked, setIsChecked] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation<AllBugsNavigationType>();

    const filteredData = allBugs?.filter((bug) => {
        const matchesSearchQuery =
            bug.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bug.language.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesIsChecked = !isChecked || bug.isFixed;
        return matchesSearchQuery && matchesIsChecked;
    });

    const renderItem = ({ item }: { item: IAllBugs }) => (
        <Pressable onPress={() => navigation.navigate('FavoriBugDettail', { bug: item })}>
            <FavoriBug bug={item} />
        </Pressable>
    );


    if (error) {
        console.error('Error fetching data:', error);
        return (
            <Container>
                <FilterText>Failed to load bugs. Please try again later.</FilterText>
            </Container>
        );
    }

    return (
        <SafeArea>
            <FilterRow>
                <FilterButton onPress={() => setIsChecked(!isChecked)}>
                    <FilterText>Filtre</FilterText>
                    <AntDesign name="filter" size={20} color="black" />
                    <CheckboxWrapper>
                        {isChecked ? (
                            <FontAwesome6 name="square-check" size={23} color="black" />
                        ) : (
                            <Feather name="square" size={24} color="black" />
                        )}
                    </CheckboxWrapper>
                </FilterButton>
            </FilterRow>

            <SearchRow>
                <FontAwesome5 name="search" size={20} color="gray" />
                <SearchInput
                    placeholder="Search..."
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                />
            </SearchRow>

            <ListContainer>
                <FlatList
                    data={filteredData}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <ItemSeparator />}
                    keyExtractor={(item) => item._id}
                />
            </ListContainer>
        </SafeArea>
    );
};

export default FavoriBugsScreen;