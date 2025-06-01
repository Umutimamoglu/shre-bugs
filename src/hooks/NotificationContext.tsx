import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useRef,
    ReactNode,
} from "react";
import * as Notifications from "expo-notifications";
import { EventSubscription } from "expo-notifications";
import * as Device from "expo-device";
import { registerForPushNotificationsAsync } from "../utils/registerforPushNotifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "@src/services/connections";


interface NotificationContextType {
    expoPushToken: string | null;
    notification: Notifications.Notification | null;
    error: Error | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error("useNotification must be used within a NotificationProvider");
    }
    return context;
};

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
    children,
}) => {
    const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
    const [notification, setNotification] = useState<Notifications.Notification | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const notificationListener = useRef<EventSubscription | null>(null);
    const responseListener = useRef<EventSubscription | null>(null);

    // 🚀 Bildirim izni ve token alma işlemi
    useEffect(() => {
        const initNotifications = async () => {
            if (Device.isDevice) {
                try {
                    const token = await registerForPushNotificationsAsync();
                    const finalToken = token ?? null;
                    setExpoPushToken(finalToken);
                    if (finalToken) {
                        await AsyncStorage.setItem("sahrebugsStoken", finalToken);
                        console.log("✅ Token AsyncStorage'a kaydedildi:", finalToken);
                    }
                } catch (err) {
                    console.log("🚨 Token alma hatası:", err);
                    setError(err as Error);
                }
            } else {
                console.log("⚠️ Push notifications only work on physical devices.");
            }
        };

        initNotifications();

        notificationListener.current = Notifications.addNotificationReceivedListener(
            (notification) => {
                console.log("🔔 Bildirim geldi (ön planda):", notification);
                setNotification(notification);
            }
        );

        responseListener.current = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                console.log("📲 Bildirime tıklama:", JSON.stringify(response, null, 2));
            }
        );

        return () => {
            notificationListener.current?.remove();
            responseListener.current?.remove();
        };
    }, []);

    // 🛠 Token güncellemesi (backend'e gönder)
    useEffect(() => {
        const updateTokenOnBackend = async () => {
            const expoPushToken = await AsyncStorage.getItem('sahrebugsStoken');
            const userJson = await AsyncStorage.getItem('@user');

            if (!expoPushToken || !userJson) return;

            try {
                const user = JSON.parse(userJson);
                const userId = user._id;

                await axios.patch(`${BASE_URL}/users/update-token/${userId}`, {
                    pushNotificationToken: expoPushToken,
                });

                console.log("✅ Token backend’e güncellendi:", expoPushToken);
            } catch (err) {
                console.error("❌ Token güncelleme başarısız:", err);
            }
        };

        updateTokenOnBackend();
    }, [expoPushToken]);

    return (
        <NotificationContext.Provider value={{ expoPushToken, notification, error }}>
            {children}
        </NotificationContext.Provider>
    );
};
