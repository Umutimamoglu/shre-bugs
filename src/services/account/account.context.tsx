import React, { useState, useEffect, createContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RegisterUserTypes, LoginUserTypes, IAuthenticatedUser } from "types";
import { registerUser, loginUser, deleteToken, axiosInstance } from "./account.service";

interface AccountContextType {
    isLoading: boolean;
    error: string | null;
    user: IAuthenticatedUser | null;
    isLoggedIn: boolean;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    setUser: React.Dispatch<React.SetStateAction<IAuthenticatedUser | null>>;
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
    const [user, setUser] = useState<IAuthenticatedUser | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Kullanıcının giriş yapıp yapmadığını takip eden state

    useEffect(() => {
        const loadUserFromStorage = async () => {
            try {
                const storedUser = await AsyncStorage.getItem("@user");
                if (storedUser) {
                    const parsedUser: IAuthenticatedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                    setIsLoggedIn(true);
                    console.log("User restored from storage:", parsedUser);
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

            const authenticatedUser: IAuthenticatedUser = {
                _id: registeredUser._id,
                email: registeredUser.email,
                name: registeredUser.name,
                image: registeredUser.image || null,
                positionTitle: registeredUser.positionTitle,
            };

            setUser(authenticatedUser);
            setIsLoggedIn(true);
            await AsyncStorage.setItem("@user", JSON.stringify(authenticatedUser));
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
            const response = await loginUser({ email, password });

            const authenticatedUser: IAuthenticatedUser = {
                _id: response.user._id,
                email: response.user.email,
                name: response.user.name,
                image: response.user.image || null,
                positionTitle: response.user.positionTitle,
            };

            await AsyncStorage.setItem("@user", JSON.stringify(authenticatedUser));
            setUser(authenticatedUser);
            setIsLoggedIn(true);
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;
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
            setIsLoggedIn(false);
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
                user,
                isLoggedIn,
                setError,
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
