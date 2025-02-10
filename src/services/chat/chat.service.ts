import { useContext } from "react";
import { axiosInstance } from "../account/account.service";
import { Message } from "types";



export const findOrCreateChatRequest = async (userId: string, otherUserId: string): Promise<string> => {
    try {
        // Önce var olan sohbeti kontrol et
        const response = await axiosInstance.get(`/api/chat/chat/${userId}/${otherUserId}`);

        if (response.data) {
            return response.data._id; // Var olan sohbetin ID'sini döndür
        } else {
            // Sohbet yoksa yeni bir tane oluştur
            const newChatResponse = await axiosInstance.post("/api/chat/chat", {
                firstId: userId,
                secondId: otherUserId,
            });
            return newChatResponse.data._id; // Yeni oluşturulan sohbetin ID'sini döndür
        }
    } catch (error) {
        console.error("Chat bulunurken veya oluşturulurken hata oluştu:", error);
        throw new Error("Sohbet oluşturulurken hata oluştu.");
    }
};


export const fetchMessagesRequest = async (chatId: string): Promise<Message[]> => {
    try {
        const response = await axiosInstance.get(`/api/chat/messages/${chatId}`);
        return response.data;
    } catch (error) {
        console.error("Mesajlar alınırken hata oluştu:", error);
        return [];
    }
};




export const sendMessageRequest = async (chatId: string, senderId: string, message: string): Promise<Message | null> => {
    try {
        const response = await axiosInstance.post("/api/chat/message", {
            chatId,
            senderId,
            message,
        });
        return response.data;
    } catch (error) {
        console.error("Mesaj gönderilirken hata oluştu:", error);
        return null;
    }
};