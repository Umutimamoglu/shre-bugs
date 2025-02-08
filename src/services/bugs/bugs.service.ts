import { CreateBugPayload, IAllBugs, IBug } from "types";
import { axiosInstance } from "../account/account.service";
import { BASE_URL } from "../connections";
import { AxiosError } from "axios";




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

export const getAllBugsRequest = async (): Promise<IAllBugs[]> => {
    try {

        const response = await axiosInstance.get(`${BASE_URL}/api/bugs/getAllErrors`);
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



export const deleteBugRequest = async (bugId: string): Promise<void> => {
    try {
        const response = await axiosInstance.delete(`/api/bugs/deleteError/${bugId}`);
        if (response.status === 200) {
            console.log("Bug deleted successfully");
        } else {
            throw new Error("Failed to delete bug");
        }
    } catch (error) {
        console.error("Error while deleting bug:", error);
        throw error;
    }
};

export const updateBugRequest = async (bugId: string, updatedFields: Partial<IBug>): Promise<IBug> => {
    try {
        const response = await axiosInstance.put(`${BASE_URL}/api/bugs/updateError/${bugId}`, updatedFields);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Axios error while updating bug:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            throw new Error(`Error updating bug: ${error.response?.data?.message || "Unknown error occurred"}`);
        } else {
            console.error("Unexpected error:", error);
            throw new Error("An unexpected error occurred while updating bug.");
        }
    }
};

export const addfavorirequest = async (updatedFields: IBug): Promise<IBug> => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/api/bugs/addToFavorites/`, updatedFields);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Axios error while updating bug:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            throw new Error(`Error updating bug: ${error.response?.data?.message || "Unknown error occurred"}`);
        } else {
            console.error("Unexpected error:", error);
            throw new Error("An unexpected error occurred while updating bug.");
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