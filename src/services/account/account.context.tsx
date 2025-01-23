import React, { useState, useEffect, createContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { RegisterUserTypes, LoginUserTypes } from "types";
import { registerUser, loginUser, deleteToken, axiosInstance } from "./account.service";

interface AccountContextType {
    isLoading: boolean;
    error: string | null;
    user: RegisterUserTypes | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    setUser: React.Dispatch<React.SetStateAction<RegisterUserTypes | null>>;
    register: (
        email: string,
        password: string,
        name: string,
        image: string | null,
        positionTitle: string
    ) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AccountContext = createContext<AccountContextType>(
    {} as AccountContextType
);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<RegisterUserTypes | null>(null);

    useEffect(() => {
        const loadUserFromStorage = async () => {
            try {
                const storedUser = await AsyncStorage.getItem("@user");
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                    console.log("User restored from storage:", JSON.parse(storedUser));
                }
            } catch (err) {
                console.error("Error loading user from AsyncStorage:", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadUserFromStorage();
    }, []);

    const register = async (
        email: string,
        password: string,
        name: string,
        image: string | null,
        positionTitle: string
    ) => {
        setIsLoading(true);
        setError(null);

        try {
            const registeredUser = await registerUser({
                email,
                name,
                password,
                image,
                positionTitle,
            });
            setUser(registeredUser);
            await AsyncStorage.setItem("@user", JSON.stringify(registeredUser));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const loggedInUser = await loginUser({ email, password });
            await AsyncStorage.setItem("@user", JSON.stringify(loggedInUser));
            setUser(loggedInUser);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        setError(null);

        try {
            await AsyncStorage.removeItem("@user");
            await deleteToken("blossom_user_token");
            delete axiosInstance.defaults.headers.common["Authorization"];
            setUser(null);
        } catch (err) {
            setError("Logout failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AccountContext.Provider
            value={{
                isLoading,
                error,
                setError,
                user,
                setUser,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};
