import { IBug } from "types";
import { axiosInstance } from "../account/account.service";
import { BASE_URL } from "../connections";
import { AxiosError } from "axios";

export interface CreateBugPayload {
    name: string;
    color: {
        id: string;
        name: string;
        code: string;
    };
    isFixed: boolean;
    language: string;
    type: string;
    howDidIFix: string;
    image?: {
        uri: string;
        name: string;
        type: string;
    };
}

export const createBugRequest = async (payload: CreateBugPayload) => {
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("color[id]", payload.color.id);
    formData.append("color[name]", payload.color.name);
    formData.append("color[code]", payload.color.code);
    formData.append("isFixed", payload.isFixed.toString());
    formData.append("language", payload.language);
    formData.append("type", payload.type);
    formData.append("howDidIFix", payload.howDidIFix || "null");

    if (payload.image) {
        formData.append("image", {
            uri: payload.image.uri,
            type: payload.image.type,
            name: payload.image.name,
        } as unknown as Blob); // React Native ile uyumluluk için
    }

    logFormData(formData); // FormData içeriğini logla

    try {
        const response = await axiosInstance.post(`${BASE_URL}/api/bugs/create`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error while creating bug:", error);
        throw error;
    }
};

export const getMyBugsRequest = async (): Promise<IBug[]> => {
    try {
        console.log("Axios request headers:", axiosInstance.defaults.headers.common); // Header'ları logla
        const response = await axiosInstance.get(`${BASE_URL}/api/bugs/getMyErrors`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Axios error while fetching bugs:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers,
            });
            throw new Error(`Error fetching bugs: ${error.response?.data?.message || "Unknown error occurred"}`);
        } else {
            console.error("Unexpected error:", error);
            throw new Error("An unexpected error occurred while fetching bugs.");
        }
    }
};
const logFormData = (formData: FormData) => {
    const entries: any[] = [];
    formData.forEach((value, key) => {
        entries.push({ [key]: value });
    });
    console.log("FormData Content:", JSON.stringify(entries, null, 2));
};