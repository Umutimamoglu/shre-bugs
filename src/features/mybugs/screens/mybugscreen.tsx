import React, { useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useBug } from '@src/services/bugs/bugs.context';
import { BugsNavigationType } from '@src/infrastracture/navigation/types';
import Bug from '../components/bug';
import { IBug } from 'types';
import {

    Container,
    FilterRow,
    FilterButton,
    FilterContent,
    FilterText,
    CheckboxWrapper,
    SearchRow,
    SearchInput,
    ListContainer,
    ItemSeparator,
    TopContainer,
    BottomContainer,
} from '@src/features/mybugs/components/mybug.styled'; // Önceden tanımlı styled-components dosyasından geliyor
import { theme } from '@src/theme';
import { SafeArea } from '@src/components/main.style';



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
        <SafeArea edges={[]} color={theme.colors.ui.secondary}>

            <Container>
                {/* Filtre ve Checkbox */}
                <TopContainer>


                    <FilterRow>
                        <FilterButton>
                            <FilterContent>
                                <FilterText>Filtre</FilterText>
                                <AntDesign name="filter" size={20} color="black" />
                            </FilterContent>
                            <Pressable onPress={() => setIsChecked(!isChecked)}>
                                <CheckboxWrapper>
                                    {isChecked ? (
                                        <FontAwesome6 name="square-check" size={23} color="black" />
                                    ) : (
                                        <Feather name="square" size={24} color="black" />
                                    )}
                                </CheckboxWrapper>
                            </Pressable>
                        </FilterButton>
                    </FilterRow>

                    {/* Arama Çubuğu */}
                    <SearchRow>
                        <FontAwesome5 name="search" size={20} color="gray" />
                        <SearchInput
                            placeholder="Ara..."
                            value={searchQuery}
                            onChangeText={(text) => setSearchQuery(text)}
                        />
                    </SearchRow>
                </TopContainer>
                {/* Liste */}
                <BottomContainer>


                    <FlatList
                        data={filteredData}
                        keyExtractor={(item) => item._id}
                        renderItem={renderItem}
                        ItemSeparatorComponent={() => <ItemSeparator />}
                        contentContainerStyle={{ paddingBottom: 16 }}
                        showsVerticalScrollIndicator={false}
                    />
                </BottomContainer>
            </Container>
        </SafeArea>
    );
};

export default MyBugsScreen;