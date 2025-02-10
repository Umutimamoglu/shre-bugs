import React, { useContext, useEffect, useState } from "react";
import { FlatList, TextInput, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AllBugsStackParamList } from "@src/infrastracture/navigation/types";
import { AccountContext } from "@src/services/account/account.context";
import { useChat } from "@src/services/chat/chat.context";
import { SafeAreaView } from "react-native-safe-area-context";
import MessageItem from "../components/messageItem";
import { SafeArea } from "@src/components/main.style";
import { theme } from "@src/theme";

type ChatScreenRouteProp = RouteProp<AllBugsStackParamList, "ChatScreen">;
const ChatScreen = () => {
    const route = useRoute<ChatScreenRouteProp>();
    const { bug } = route.params;
    const { user } = useContext(AccountContext);

    const { chatId, messages, isLoading, findOrCreateChat, fetchMessages, sendMessage } = useChat();
    const [newMessage, setNewMessage] = useState<string>("");

    useEffect(() => {
        if (!user || !bug) return;

        const initChat = async () => {
            try {
                const chatId = await findOrCreateChat(user, bug);
                if (chatId) {
                    await fetchMessages(chatId);
                }
            } catch (error) {
                console.error("Chat oluşturulurken hata oluştu:", error);
            }
        };

        initChat();
    }, [user, bug]);

    const handleSendMessage = async () => {
        if (newMessage.trim() && user && chatId) {
            await sendMessage(chatId, user._id, newMessage);
            setNewMessage("");
        }
    };

    return (
        <SafeArea edges={["top"]} color={theme.colors.ui.tertiary2}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => console.log("Geri Git")}>
                    <Text style={styles.backButton}>{"<"}</Text>
                </TouchableOpacity>
                {/* Kullanıcı adı boşsa "Unknown User" göster */}
                <Text style={styles.headerTitle}>{bug.user?.name || "Unknown User"}</Text>
            </View>

            <View style={styles.separator} />

            {/* Mesaj Listesi */}
            <FlatList
                data={messages}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <MessageItem item={item} isMyMessage={item.sender === user?._id} />
                )}
            />

            {/* Mesaj Gönderme Alanı */}
            <View style={styles.inputContainer}>
                <TextInput
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Mesaj yazın"
                    style={styles.input}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                    <Text style={styles.sendButtonText}>Gönder</Text>
                </TouchableOpacity>
            </View>
        </SafeArea>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#E0E0E0',
        padding: 10,
    },
    backButton: {
        fontSize: 24,
        color: '#333',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#444',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCC',
        width: '100%',
    },
    messageList: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#CCC',
        backgroundColor: '#FFF',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 20,
        padding: 10,
        backgroundColor: 'white',
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: '#E57373',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    sendButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ChatScreen;
