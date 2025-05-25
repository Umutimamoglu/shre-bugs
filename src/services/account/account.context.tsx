import React, { useState, useEffect, createContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RegisterUserTypes, LoginUserTypes, IAuthenticatedUser } from "types";
import { registerUser, loginUser, deleteToken, axiosInstance, updateProfileService, saveToken } from "./account.service";
import { BASE_URL } from "../connections";
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
        positionTitle: string,
        fixedBugsCount: string,
        experience: string,
        country: string
    ) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    updateProfile: (profileData: IAuthenticatedUser) => Promise<void>;
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
        positionTitle: string,
        fixedBugsCount: string,
        experience: string,
        country: string
    ) => {
        setIsLoading(true);
        setError(null);

        try {
            const { user: registeredUser, token } = await registerUser({
                email,
                password,
                name,
                image,
                positionTitle,
                fixedBugsCount,
                experience,
                country
            });

            const authenticatedUser: IAuthenticatedUser = {
                _id: registeredUser._id,
                email: registeredUser.email,
                name: registeredUser.name,
                image: registeredUser.image || null,
                positionTitle: registeredUser.positionTitle,
                fixedBugsCount: registeredUser.fixedBugsCount,
                experience: registeredUser.experience,
                country: registeredUser.country
            };

            setUser(authenticatedUser);
            setIsLoggedIn(true);

            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            await saveToken("blossom_user_token", token);
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
                fixedBugsCount: response.user.fixedBugsCount,
                experience: response.user.experience,
                country: response.user.country
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

    const updateProfile = async (profileData: IAuthenticatedUser) => {
        setIsLoading(true);
        setError(null);
        console.log("update user çalıstı")
        try {
            const formData = new FormData();

            formData.append('_id', profileData._id);
            formData.append('name', profileData.name);
            formData.append('email', profileData.email);
            formData.append('positionTitle', profileData.positionTitle || '');
            formData.append('fixedBugsCount', profileData.fixedBugsCount || '');
            formData.append('experience', profileData.experience || '');
            formData.append('country', profileData.country || '');

            if (profileData.image && profileData.image.startsWith("file://")) {
                const filename = profileData.image.split('/').pop();
                const match = /\.(\w+)$/.exec(filename || '');
                const ext = match ? match[1] : 'jpg';
                const mimeType = `image/${ext}`;

                formData.append('image', {
                    uri: profileData.image,
                    name: filename,
                    type: mimeType,
                } as any);  // TypeScript için
            }
            console.log("fetch de çalıstı")
            const response = await fetch(`${BASE_URL}/users/updateUser`, {
                method: 'PUT',
                headers: {
                    // Content-Type belirtme! fetch bunu kendi ayarlıyor
                },
                body: formData
            });

            const updatedUser = await response.json();

            if (!response.ok) throw new Error(updatedUser.message || 'Güncelleme başarısız');
            console.log(response)
            setUser(updatedUser);
            await AsyncStorage.setItem("@user", JSON.stringify(updatedUser));
            setIsLoggedIn(true);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                console.error("Profil güncelleme hatası:", err.message);
            }
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
                updateProfile,
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};
