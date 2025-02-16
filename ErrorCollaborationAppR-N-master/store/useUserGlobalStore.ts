import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IAuthenticatedUser } from "../types";

interface IUserGlobalStore {
    user: IAuthenticatedUser | null;
    isLoggedIn: boolean;
    updateUser: (user: IAuthenticatedUser | null) => void;
    logout: () => void;
}

const useUserGlobalStore = create<IUserGlobalStore>()(
    persist(
        (set) => ({
            user: null,
            isLoggedIn: false,
            updateUser: (user) => {
                if (user) {
                    console.log("Updating user in global store:", user);
                    set({ user, isLoggedIn: true });
                } else {
                    console.log("Clearing user from global store");
                    set({ user: null, isLoggedIn: false });
                }
            },
            logout: async () => {
                console.log("Clearing user and resetting store");
                await AsyncStorage.clear(); // AsyncStorage'daki tüm verileri temizler
                set({ user: null, isLoggedIn: false });
            },
        }),
        {
            name: "ErrorCol-store", // Persisted storage name
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useUserGlobalStore;
