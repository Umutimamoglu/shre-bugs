import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "../connections";
const TIME_OUT = 200000;
import { LoginUserTypes, RegisterUserTypes } from "../../../types";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
});


export const saveToken = async (key: string, value: string) => {
    try {
        await SecureStore.setItemAsync(key, value);
    } catch (error) {
        console.error("Error in saveToken:", error);
        throw error;
    }
};



export const registerUser = async ({ email, name, password, image, positionTitle }: RegisterUserTypes) => {
    console.log("Registering user:", { email, name, password, image });
    try {
        const response = await axiosInstance.post("/users/create", {
            email,
            password,
            name,
            image,
            positionTitle
        });
        console.log("User registration successful:", response.data.user);
        return response.data.user;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Axios error during registration:", {
                message: error.message,
                response: error.response?.data, // API'den dönen hata mesajı
                status: error.response?.status, // HTTP durum kodu
                headers: error.response?.headers // Yanıt başlıkları
            });
            throw new Error(`Registration failed: ${error.response?.data?.message || "Unknown error occurred"}`);
        } else {
            console.error("Unexpected error during registration:", error);
            throw new Error("An unexpected error occurred during registration.");
        }
    }
};


export const loginUser = async ({ email, password }: LoginUserTypes) => {
    console.log("Login data:", { email, password });  // Log the email and password
    try {
        const response = await axiosInstance.post("/users/login", {
            email,
            password,
        });
        const _token = response.data.token;
        await saveToken('blossom_user_token', _token);
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${_token}`;
        console.log("Login successful, token received:", _token);
        return response.data.user;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Axios error:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers
            });
            throw new Error(`Login failed: ${error.response?.data?.message || "Unknown error occurred"}`);
        } else {
            console.error("Unexpected error:", error);
            throw new Error("An unexpected error occurred during login.");
        }
    }
};
