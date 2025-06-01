import { useEffect } from 'react';
import { consumePendingNavigation } from './navigationQueue';
import { navigate } from '../infrastracture/navigation/navigationRef';

export const useStartupNavigation = () => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            const nav = consumePendingNavigation();
            if (nav?.screen) {
                if (nav.screen === "ChatScreen") {
                    navigate("Feed", {
                        screen: "ChatScreen",
                        params: nav.params,
                    });
                } else {
                    navigate(nav.screen, nav.params);
                }
            }
        }, 1000); // Navigation hazır olana kadar kısa bir gecikme

        return () => clearTimeout(timeout);
    }, []);
};
