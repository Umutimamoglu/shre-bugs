
interface IAuthenticatedUser {
    email: string
    name: string
    _id: string;
    image?: string | null;
    positionTitle: string,
    fixedBugsCount: string,
    experience: string,
    country: string,
    pushNotificationToken?: string | null;
}

export interface IColor {
    name: string
    id: string
    code: string
}

export interface IIcon {
    name: string
    id: string
    symbol: string
}

export interface IUserGetAllErrors {
    _id: string;
    name: string;
    email: string;

}

export interface IUser {
    name: string;
    email: string;
    password: string;
    image: string;
}


export interface ILogin {
    email: string;
    password: string;
}



export interface ICreateErrorRequest {


    name: string;
    isFixed: boolean;
    language: string;
    image?: string | null;
    color?: IColor;
    type: string;
    howDidIFix?: string;
}

export interface IBug {
    _id: string
    name: string;
    isFixed: boolean;
    language: string;
    image?: string;
    color: IColor;
    type: string;
    howDidIFix?: string;
}

export interface IAllBugs {
    createdAt: string | number | Date
    _id: string
    user: IAuthenticatedUser;
    name: string;
    isFixed: boolean;
    language: string;
    image?: string;
    color: IColor;
    type: string;
    howDidIFix?: string;
    Date: Date;
    Time: Time;
}

export interface CreateBugPayload {
    //don't change this. The species that come and go are not the same
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

interface Message {
    _id: string;
    sender: string;
    message: string;
    createdAt: string;
}
export type RegisterUserTypes = {
    email: string;
    name: string;
    password: string;
    image: string | null; // Null değerini de destekle
    positionTitle: string;
    fixedBugsCount: string;
    experience: string;
    country: string;
};
type LoginUserTypes = {
    email: string;
    password: string;
};
export interface SignUpFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    positionTitle: string;
    pushNotificationToken?: string | null;
};
export interface SignIbFormData {

    email: string;
    password: string;

};



