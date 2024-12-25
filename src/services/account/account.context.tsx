import React, { useState, createContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RegisterUserTypes } from "types";
import { registerUser, loginUser } from "./account.service";

// Context Tipi
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


export const AccountContext = createContext<AccountContextType>({} as AccountContextType);


if (!AccountContext) {
    throw new Error("AccountContext must be used within an AccountProvider");
}
// Provider Component
export const AccountProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<RegisterUserTypes | null>(null);

    // Register Function
    const register = async (email: string, password: string, name: string, image: string | null, positionTitle: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const registeredUser = await registerUser({ email, name, password, image, positionTitle });
            setUser(registeredUser);
            console.log("User registered and set:", registeredUser);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            console.error("Error during registration:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Login Function
    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const loggedInUser = await loginUser({ email, password });
            setUser(loggedInUser);
            console.log("User logged in and set:", loggedInUser);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            console.error("Error during login:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Logout Function
    const logout = async () => {
        setIsLoading(true);
        setError(null);

        try {
            await AsyncStorage.removeItem("blossom_user_token");
            setUser(null);
            console.log("User logged out.");
        } catch (err) {
            console.error("Error during logout:", err);
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
