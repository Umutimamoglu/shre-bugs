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
import * as Device from "expo-device"; // 👈 yeni eklendi
import { registerForPushNotificationsAsync } from "../utils/registerforPushNotifications";

interface NotificationContextType {
    expoPushToken: string | null;
    notification: Notifications.Notification | null;
    error: Error | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined
);

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

    useEffect(() => {
        // ✅ Sadece fiziksel cihazda token al
        if (Device.isDevice) {
            registerForPushNotificationsAsync().then(
                (token) => setExpoPushToken(token ?? null),
                (error) => setError(error)
            );
        } else {
            console.log("⚠️ Push notifications only work on physical devices.");
        }

        notificationListener.current = Notifications.addNotificationReceivedListener(
            (notification) => {
                console.log("🔔 Notification received while app is running:", notification);
                setNotification(notification);
            }
        );

        responseListener.current = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                console.log("🔔 Notification response received:", JSON.stringify(response, null, 2));
            }
        );

        return () => {
            notificationListener.current?.remove();
            responseListener.current?.remove();
        };
    }, []);

    return (
        <NotificationContext.Provider value={{ expoPushToken, notification, error }}>
            {children}
        </NotificationContext.Provider>
    );
};
