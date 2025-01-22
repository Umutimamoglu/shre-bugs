import { axiosInstance } from "../account/account.service";
import { BASE_URL } from "../connections";

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



const logFormData = (formData: FormData) => {
    const entries: any[] = [];
    formData.forEach((value, key) => {
        entries.push({ [key]: value });
    });
    console.log("FormData Content:", JSON.stringify(entries, null, 2));
};