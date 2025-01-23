import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    TextInput,
    Text,
    Pressable,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';



import { IAllBugs } from 'types';
import { AllBugsNavigationType } from '@src/infrastracture/navigation/types';
import { useBug } from '@src/services/bugs/bugs.context';
import AllBug from '../components/allBug';
import { SafeArea } from '@src/components/main.style';
import NavigateBack from '../components/navigate-back';
import { theme } from '@src/theme';

const FeedScreen = () => {
    const navigation = useNavigation<AllBugsNavigationType>();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedBug, setSelectedBug] = useState<IAllBugs | null>(null);

    // Context üzerinden çekilen veriler
    const { allBugs, isLoading, error, refreshAllBugs } = useBug();

    // Bileşen yüklendiğinde veya yeniden odaklandığında verileri yenile
    useEffect(() => {
        refreshAllBugs();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={{ color: 'red' }}>Hata: {error}</Text>
            </View>
        );
    }

    // Arama sorgusuna göre filtre
    const filteredData = allBugs?.filter((bug) =>
        bug.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bug.language.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // FlatList item render metodu
    const renderItem = ({ item }: { item: IAllBugs }) => (
        <Pressable onPress={() => setSelectedBug(item)}>
            <AllBug bug={item} />
            {selectedBug?._id === item._id && <Text>(Seçili)</Text>}
        </Pressable>
    );

    // "Favoriler" ekranına git
    const goToFavoriBugsScreen = () => {
        navigation.navigate("FavoriBugs");
    };

    return (
        <SafeArea edges={["top"]} color={theme.colors.ui.tertiary}>

            <View style={styles.container}>

                {/* Üst kısım: Geri butonu - Başlık - Favoriler butonu */}
                <View style={styles.headerContainer}>
                    <NavigateBack />
                    <Text style={[styles.title, { flex: 1 }]}>Hata Akış</Text>
                    <Pressable style={styles.button} onPress={goToFavoriBugsScreen}>
                        <Text style={styles.buttonText}>Favoriler</Text>
                    </Pressable>
                </View>

                {/* Arama bölümü */}
                <View style={styles.searchBarContainer}>
                    <FontAwesome5 name="search" size={20} color="gray" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Ara..."
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)}
                    />
                </View>

                {/* Ana içerik: FlatList */}
                <View style={styles.flatListContainer}>
                    <FlatList
                        data={filteredData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id}
                        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
                        ListEmptyComponent={
                            <Text style={{ textAlign: 'center', marginTop: 20 }}>
                                Gösterilecek hata bulunamadı.
                            </Text>
                        }
                    />
                </View>
            </View>
        </SafeArea>
    );
};

export default FeedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.ui.secondary, // Örnek amaçlı zinc400 rengini Hex olarak tanımladık
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#ef4444',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 100,
        height: 40,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    searchBarContainer: {
        flexDirection: 'row',
        backgroundColor: theme.colors.ui.secondary,
        paddingHorizontal: 16,
        alignItems: 'center',
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        height: 40,
        marginLeft: 10,
        paddingLeft: 10,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    flatListContainer: {
        flex: 1,
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 16,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
