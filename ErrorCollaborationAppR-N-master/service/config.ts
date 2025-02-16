import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const BASE_URL = "http://192.168.1.102:1337";
const TIME_OUT = 200000;
export const ERROR_APP_TOKEN_NAME = "blossom_user_token";

const axiosInstance = axios.create({
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

axiosInstance.interceptors.request.use(async (req) => {
    try {
        const access_token = await SecureStore.getItemAsync(ERROR_APP_TOKEN_NAME);
        if (access_token) {
            req.headers.Authorization = `Bearer ${access_token}`;
        }
        return req;
    } catch (error) {
        console.error('Error in request interceptor:', error);
        return req;
    }
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.error('Error in response interceptor:', error);
        return Promise.reject(error);
    }
);

export const fetcher = (url: string) =>
    axiosInstance.get(url).then((res) => res.data).catch((error) => {
        console.error('Error in fetcher:', error);
        throw error;
    });

export default axiosInstance;
