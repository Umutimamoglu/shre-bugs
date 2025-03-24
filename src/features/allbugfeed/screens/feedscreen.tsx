import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Text,
    Pressable,
    ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { IAllBugs } from 'types';
import { AllBugsNavigationType } from '@src/infrastracture/navigation/types';
import { useBug } from '@src/services/bugs/bugs.context';
import AllBug from '../components/allBug';
import { SafeArea } from '@src/components/main.style';
import { theme } from '@src/theme';

import {
    Container,
    SearchBarContainer,
    SearchInput,
    FlatListContainer,
    CenteredView,
    EmptyListText,
    HeaderContainer,
    BackButton,
    ActionButton,
    HeaderTitle,
    ItemSeparator
} from '../components/feed.Styled';


const FeedScreen = () => {
    const navigation = useNavigation<AllBugsNavigationType>();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedBug, setSelectedBug] = useState<IAllBugs | null>(null);

    const { allBugs, isLoading, error, refreshAllBugs } = useBug();

    useEffect(() => {
        refreshAllBugs();
    }, []);

    if (isLoading) {
        return (
            <CenteredView>
                <ActivityIndicator size="large" color="#000" />
            </CenteredView>
        );
    }

    if (error) {
        return (
            <CenteredView>
                <Text style={{ color: 'red' }}>Hata: {error}</Text>
            </CenteredView>
        );
    }

    const filteredData = allBugs?.filter((bug) =>
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
        <SafeArea edges={["top"]} color={theme.colors.ui.tertiary2}>
            <Container>

                {/* ✅ Styled Header (Artık ayrı bir bileşen değil, styled içinde) */}
                <HeaderContainer>
                    <BackButton onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name="arrow-left" size={36} color="#000" />
                    </BackButton>
                    <HeaderTitle>Hata Akış</HeaderTitle>
                    <ActionButton onPress={goToFavoriBugsScreen}>
                        <MaterialCommunityIcons name="table-heart" size={36} color="#F5daF5" />
                    </ActionButton>
                </HeaderContainer>

                {/* 🔎 Styled Search Bar */}
                <SearchBarContainer>
                    <FontAwesome5 name="search" size={20} color="gray" />
                    <SearchInput
                        placeholder="Ara..."
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)}
                    />
                </SearchBarContainer>

                <FlatListContainer>
                    <FlatList
                        data={filteredData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id}
                        contentContainerStyle={{ paddingVertical: 8 }}  // Üst ve alt boşluğu ayarlar
                        ItemSeparatorComponent={() => <ItemSeparator />}
                        ListEmptyComponent={
                            <EmptyListText>
                                Gösterilecek hata bulunamadı.
                            </EmptyListText>
                        }
                    />
                </FlatListContainer>


            </Container>
        </SafeArea>
    );
};
export default FeedScreen;
