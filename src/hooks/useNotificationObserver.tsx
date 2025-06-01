import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { EventSubscription } from 'expo-notifications';
import { navigate } from '../infrastracture/navigation/navigationRef';

export const useNotificationObserver = () => {
  useEffect(() => {
    const subscription: EventSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;
        console.log("📲 Bildirime tıklanıldı, data:", data);

        if (typeof data?.screen === 'string') {
          const screen: string = data.screen;
          const params = typeof data.params === 'object' ? data.params : undefined;

          // 🔁 Nested navigator olduğu için `Feed` sekmesine git, sonra stack ekranını aç
          if (screen === "ChatScreen") {
            navigate("Feed", {
              screen: "ChatScreen",
              params,
            });
            console.log("paramss LOGUUUUUU   : :  : :  : ", params)
          } else {
            navigate(screen, params); // Diğer ekranlar için
          }
        }
      });

    return () => {
      subscription.remove();
    };
  }, []);
};
