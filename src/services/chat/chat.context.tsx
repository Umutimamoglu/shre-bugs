import React, { createContext, useContext, useState } from "react";
import { findOrCreateChatRequest, fetchMessagesRequest, sendMessageRequest } from "./chat.service";
import { IAuthenticatedUser, IAllBugs, Message } from "types";

interface ChatContextProps {
    chatId: string | null;
    messages: Message[];
    isLoading: boolean;
    findOrCreateChat: (user: IAuthenticatedUser, bug: IAllBugs) => Promise<string | null>;
    fetchMessages: (chatId: string) => Promise<void>;
    sendMessage: (chatId: string, senderId: string, message: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [chatId, setChatId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const findOrCreateChat = async (user: IAuthenticatedUser, bug: IAllBugs): Promise<string | null> => {
        if (!user || !bug.user) return null;

        setIsLoading(true);
        try {
            const chatId = await findOrCreateChatRequest(user._id, bug.user._id);
            setChatId(chatId);
            return chatId;
        } catch (error) {
            console.error("Chat bulunurken hata oluştu:", error);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const fetchMessages = async (chatId: string) => {
        setIsLoading(true);
        try {
            const messages = await fetchMessagesRequest(chatId);
            setMessages(messages);
        } catch (error) {
            console.error("Mesajlar alınırken hata oluştu:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = async (chatId: string, senderId: string, message: string) => {
        setIsLoading(true);
        try {
            const newMessage = await sendMessageRequest(chatId, senderId, message);
            if (newMessage) {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
        } catch (error) {
            console.error("Mesaj gönderilirken hata oluştu:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ChatContext.Provider value={{ chatId, messages, isLoading, findOrCreateChat, fetchMessages, sendMessage }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};
