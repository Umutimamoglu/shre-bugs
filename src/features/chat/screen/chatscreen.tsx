import React, { useContext, useEffect, useMemo, useState } from "react";
import {
    FlatList,
    TextInput,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AllBugsNavigationType, AllBugsStackParamList } from "@src/infrastracture/navigation/types";
import { AccountContext } from "@src/services/account/account.context";
import { useChat } from "@src/services/chat/chat.context";
import { SafeArea } from "@src/components/main.style";
import { theme } from "@src/theme";
import { BASE_URL } from "@src/services/connections";
import MessageItem from "../components/messageItem";
import axios from "axios";
import { BackButton } from "@src/features/allbugfeed/components/feed.Styled";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { faLeftRight } from "@fortawesome/free-solid-svg-icons";
type ChatScreenRouteProp = RouteProp<AllBugsStackParamList, "ChatScreen">;

const fallbackImage = require("../../../../assets/userUnknown.png");

const ChatScreen = () => {
    const route = useRoute<ChatScreenRouteProp>();
    const { bug } = route.params;
    const { user, updateProfile } = useContext(AccountContext);
    const navigation = useNavigation<AllBugsNavigationType>();

    const { chatId, messages, isLoading, findOrCreateChat, fetchMessages, sendMessage } = useChat();
    const [newMessage, setNewMessage] = useState<string>("");
    const [bugUser, setBugUser] = useState<any>(null);
    const [forceFallback, setForceFallback] = useState(false);


    const profileImageSource = useMemo(() => {
        if (forceFallback || !bugUser?.image || bugUser.image.trim() === "") {
            return fallbackImage;
        }

        // Eğer image zaten https:// ile başlıyorsa olduğu gibi kullan
        if (bugUser.image.startsWith("http")) {
            return { uri: bugUser.image };
        }

        // Aksi halde BASE_URL ile birleştir
        return { uri: `${BASE_URL}/${bugUser.image}` };
    }, [bugUser?.image, forceFallback]);

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

    const fetchUserDetails = async () => {
        if (!bug?.user?._id) return;

        try {
            const response = await axios.get(`${BASE_URL}/users/getUser/${bug.user._id}`);
            if (response.status === 200) {
                setBugUser(response.data);
                console.log("✅ Kullanıcı bilgileri başarıyla alındı:", response.data);
            }
        } catch (error) {
            console.error("❌ Kullanıcı bilgisi alınırken hata oluştu:", error);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, [bug]);

    const handleSendMessage = async () => {
        if (newMessage.trim() && user && chatId) {
            await sendMessage(chatId, user._id, newMessage);
            setNewMessage("");
        }
    };

    const handleIncrementFixedCount = async () => {
        if (!bugUser || !bugUser._id || !bugUser.fixedBugsCount) return;

        try {
            const updatedCount = parseInt(bugUser.fixedBugsCount, 10) + 1;

            // Eğer image file:// ile başlıyorsa, backend'e göndermemek için null yap
            const safeImage = bugUser.image?.startsWith("file://")
                ? null
                : bugUser.image;

            const updatedUser = {
                ...bugUser,
                fixedBugsCount: updatedCount.toString(),
                image: safeImage, // 🔐 image güvenli hale getirildi
            };

            await updateProfile(updatedUser);

            setBugUser(updatedUser);
            console.log("✔️ fixedBugsCount güncellendi:", updatedCount);
        } catch (error) {
            console.error("fixedBugsCount güncellenirken hata:", error);
        }
    };


    return (
        <SafeArea edges={["top"]} color={theme.colors.ui.tertiary2}>
            <View style={styles.header}>
                <BackButton onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="arrow-left" size={36} color="black" />
                </BackButton>

                {/* Kullanıcı Resmi */}
                <Image
                    source={profileImageSource}
                    style={styles.profileImage}
                    onError={() => setForceFallback(true)}
                />

                {/* Kullanıcı Adı */}
                <Text style={styles.headerTitle}>{bugUser?.name || "Unknown User"}</Text>

                {/* Sağ üstteki ikonlar */}
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 10, paddingRight: 12 }}>
                    <TouchableOpacity
                        style={styles.checkButton}
                        onPress={handleIncrementFixedCount}
                    >
                        <Text style={styles.checkIcon}>✔️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("UserDetailScreen")}>
                        <MaterialCommunityIcons name="information" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.separator} />

            <FlatList
                data={messages}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <MessageItem item={item} isMyMessage={item.sender === user?._id} />
                )}
            />

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

export default ChatScreen;

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E0E0E0",
        padding: 10,
    },
    backButton: {
        fontSize: 24,
        color: "#333",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#444",
        marginLeft: 10,
    },
    separator: {
        height: 1,
        backgroundColor: "#CCC",
        width: "100%",
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 10,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderTopWidth: 1,
        borderColor: "#CCC",
        backgroundColor: "#FFF",
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 20,
        padding: 10,
        backgroundColor: "white",
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: "#E57373",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    sendButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    checkButton: {
        width: 36,
        height: 36,
        borderRadius: 18, // yuvarlak
        backgroundColor: '#22c55e', // yeşil (Tailwind: green-500)
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkIcon: {
        fontSize: 18,
        color: 'white',
    },
});
