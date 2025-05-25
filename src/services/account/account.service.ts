import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "../connections";
const TIME_OUT = 100000;
import { IAuthenticatedUser, LoginUserTypes, RegisterUserTypes } from "../../../types";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
});

// SecureStore'da Token Kaydetme
export const saveToken = async (key: string, value: string) => {
    try {
        await SecureStore.setItemAsync(key, value);
    } catch (error) {
        console.error("Error in saveToken:", error);
        throw error;
    }
};

// Token'ı SecureStore'dan Silme
export const deleteToken = async (key: string) => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.error("Error deleting token:", error);
        throw error;
    }
};

// Register User// ✅ GÜNCELLENMİŞ HALİ
export const registerUser = async ({ email, name, password, image, positionTitle, fixedBugsCount, experience, country }: RegisterUserTypes) => {
    console.log("Registering user:", { email, name, password, image });

    try {
        const response = await axiosInstance.post("/users/create", {
            email,
            password,
            name,
            image,
            positionTitle,
            fixedBugsCount,
            experience,
            country
        });

        console.log("User registration successful:", response.data.user);

        return {
            token: response.data.token,     // ✅ token'ı da döndür
            user: response.data.user
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Axios error during registration:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers
            });
            throw new Error(`Registration failed: ${error.response?.data?.message || "Unknown error occurred"}`);
        } else {
            console.error("Unexpected error during registration:", error);
            throw new Error("An unexpected error occurred during registration.");
        }
    }
};

export const loginUser = async ({ email, password }: LoginUserTypes) => {


    try {
        const response = await axiosInstance.post("/users/login", {
            email,
            password,
        });

        console.log("✅ Login başarılı, dönen veri:", response.data);

        const _token = response.data.token;
        await saveToken("blossom_user_token", _token);
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${_token}`;

        console.log("🔐 Token kaydedildi:", _token);

        return response.data;
    } catch (error) {
        console.error("❌ Login işlemi sırasında hata oluştu:", error);
        throw new Error("Login failed.");
    }
};


export const updateProfileService = async (profileData: IAuthenticatedUser): Promise<IAuthenticatedUser> => {
    try {
        // formData veya JSON olarak göndermek tamamen backend gereksinimlerinize bağlı.
        const formData = new FormData();

        if (profileData.name) formData.append("name", profileData.name);
        if (profileData.email) formData.append("email", profileData.email);
        if (profileData.positionTitle) formData.append("positionTitle", profileData.positionTitle);
        if (profileData.image) {
            formData.append("image", {
                uri: profileData.image,
                name: "profile.jpg",
                type: "image/jpeg",
            } as any);
        }

        // /api/bugs/update örnek endpoint; kendi backend rotanıza göre güncelleyin
        const response = await axiosInstance.put("/users/updateUser", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data; // Örn: { _id, name, email, image, positionTitle, ... }
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || "Update failed");
        }
        throw error;
    }
};

// Axios Interceptor
axiosInstance.interceptors.request.use(async (req) => {
    try {
        const token = await SecureStore.getItemAsync("blossom_user_token");
        if (token) {
            req.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn("No token found in SecureStore");
        }
        return req;
    } catch (error) {
        console.error("Error in request interceptor:", error);
        return req;
    }
});