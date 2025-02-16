import { Image, StyleSheet, Pressable, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import { BugsStackParamList } from '../../navigation/types';
import { Box, Text } from '../../utils/theme';
import SafeAreaWrapper from '../../src/shared/safe-area-wrapper';
import Button from '../../src/shared/button';
import axiosInstance from '../../service/config';




type BugDetailRouteProp = RouteProp<BugsStackParamList, 'BugDetail'>;


const BugDetailScreen = () => {
    const route = useRoute<BugDetailRouteProp>();
    const { bug } = route.params;

    const [name, setName] = useState(bug.name);
    const [howDidIFix, setHowDidIFix] = useState(bug.howDidIFix);
    const [isFixed, setIsFixed] = useState(bug.isFixed);

    const updateBug = async () => {
        try {
            const response = await axiosInstance.put(`/api/errors/updateError/${bug._id}`, {
                name,
                howDidIFix,
                isFixed
            });
            if (response.status === 200) {
                console.log('Bug updated successfully');
            } else {
                console.error('Failed to update bug');
            }
        } catch (error) {
            console.error('Error while updating bug:', error);
        }
    };

    const toggleIsFixed = () => {
        setIsFixed(!isFixed);

    };


    return (
        <SafeAreaWrapper>
            <Box bg="zinc400" flex={1}>
                <Box flex={1} mx="6" justifyContent="center">
                    <Text variant="textXl" textAlign="center" mb="4">
                        Hata Detayları
                    </Text>
                    {bug.image ? (
                        <Box alignItems="center" mb="20">
                            <Image
                                source={{ uri: `${axiosInstance.defaults.baseURL}/${bug.image}` }}
                                style={styles.image}
                                onError={() => console.warn('Resim yüklenemedi, varsayılan kullanılacak')}
                            />
                        </Box>

                    ) : (
                        <Box alignItems="center" mb="2">
                            <Text>Resim Bulunamadı</Text>
                        </Box>
                    )}

                    <Box bg="gray250" borderRadius="rounded-2xl" mb="4">
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            style={{
                                fontSize: 15,
                                lineHeight: 19,
                                padding: 12,
                            }}
                        />
                    </Box>
                    <Box bg="gray250" borderRadius="rounded-2xl" mb="4">
                        <TextInput
                            value={howDidIFix}
                            onChangeText={setHowDidIFix}
                            multiline={true}
                            style={{
                                fontSize: 15,
                                lineHeight: 19,
                                padding: 12,
                            }}
                        />
                    </Box>
                    <Box flexDirection="row" ml='2' alignItems="center" mb="4">
                        <Text mr="3">is-Fixed:</Text>
                        <Pressable onPress={toggleIsFixed}>
                            <Box
                                bg={isFixed ? "green400" : "red400"}
                                px="3"
                                py="2"
                                borderRadius="rounded-2xl"
                            >
                                <Text color="white">{isFixed ? "Evet" : "Hayır"}</Text>
                            </Box>
                        </Pressable>
                    </Box>
                    <Box mb="1" mt='20' alignItems='center'>
                        <Button
                            label="Güncelle"
                            onPress={updateBug}
                        />
                    </Box>
                </Box>
            </Box>
        </SafeAreaWrapper>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
    },
});

export default BugDetailScreen;