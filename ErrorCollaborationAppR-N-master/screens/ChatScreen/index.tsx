import React, { useEffect, useState } from 'react';
import { FlatList, TextInput, Button, View, StyleSheet } from 'react-native';
import SafeAreaWraper from '../../src/shared/safe-area-wrapper';
import { Box, Text } from '../../utils/theme';
import axiosInstance from '../../service/config';
import useUserGlobalStore from '../../store/useUserGlobalStore';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AllBugsStackParamList } from '../../navigation/types';
import MessageItem from '../../src/components/messageIttem'
import NavigateBack from '../../src/shared/navigate-back';
import { Message } from '../../types';


type ChatScreenRouteProp = RouteProp<AllBugsStackParamList, 'ChatScreen'>;

const ChatScreen = () => {
    const route = useRoute<ChatScreenRouteProp>();
    const { bug } = route.params;

    const { user } = useUserGlobalStore();
    const [chatId, setChatId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');

    useEffect(() => {
        const findOrCreateChat = async () => {
            if (user) {
                try {
                    const response = await axiosInstance.get(`/api/chat/chat/${user._id}/${bug.user._id}`);

                    if (response.data) {
                        setChatId(response.data._id);
                    } else {
                        const newChatResponse = await axiosInstance.post('/api/chat/chat', {
                            firstId: user._id,
                            secondId: bug.user._id,
                        });
                        setChatId(newChatResponse.data._id);
                    }
                } catch (error) {
                    console.error('Chat bulunurken veya oluşturulurken hata oluştu:', error);
                }
            }
        };

        findOrCreateChat();
    }, [user, bug]);

    useEffect(() => {
        if (chatId) {
            const fetchMessages = async () => {
                try {
                    const response = await axiosInstance.get(`/api/chat/messages/${chatId}`);
                    setMessages(response.data);
                } catch (error) {
                    console.error('Mesajlar alınırken hata oluştu:', error);
                }
            };

            fetchMessages();
        }
    }, [chatId]);

    const handleSendMessage = async () => {
        if (newMessage.trim() && user && chatId) {
            try {
                const response = await axiosInstance.post('/api/chat/message', {
                    chatId,
                    senderId: user._id,
                    message: newMessage,
                });
                setMessages([...messages, response.data]);
                setNewMessage('');
            } catch (error) {
                console.error('Mesaj gönderilirken hata oluştu:', error);
            }
        }
    };

    const renderItem = ({ item }: { item: Message }) => {
        const isMyMessage = item.sender === user?._id;
        return <MessageItem item={item} isMyMessage={isMyMessage} />;
    };

    return (
        <SafeAreaWraper>
            {/* Header */}
            <Box
                bg="zinc400"
                paddingVertical="3"
                paddingHorizontal="3"
                justifyContent="space-between"
                alignItems="center"

                flexDirection="row"

            >
                <Box >
                    <NavigateBack />
                </Box  >


                <Text variant="textXl" color="gray800">
                    {bug.user.name}
                </Text>
            </Box>
            <Box height={0.5} width={400} bg="zinc550">

            </Box>

            <Box flex={1}>
                <FlatList
                    data={messages}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                />
                <Box flexDirection="row" padding="2">
                    <TextInput
                        value={newMessage}
                        onChangeText={setNewMessage}
                        placeholder="Mesaj yazın"
                        style={styles.input}
                    />
                    <Box borderRadius="rounded-7xl" ml="2" bg="red500">
                        <Button title="Gönder" color="white" onPress={handleSendMessage} />
                    </Box>
                </Box>
            </Box>
        </SafeAreaWraper>
    );
};

const styles = StyleSheet.create({
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 15,
        padding: 8,
        backgroundColor: "white"
    },
});

export default ChatScreen;
