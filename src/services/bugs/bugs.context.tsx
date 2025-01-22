import React, { createContext, useContext, useState } from "react";
import { CreateBugPayload, createBugRequest } from "./bugs.service";

interface BugContextProps {
    createBug: (payload: CreateBugPayload) => Promise<void>;
}

const BugContext = createContext<BugContextProps | undefined>(undefined);

export const BugProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const createBug = async (payload: CreateBugPayload) => {
        await createBugRequest(payload);
    };

    return (
        <BugContext.Provider
            value={{
                createBug

            }}>
            {children}
        </BugContext.Provider>
    );
};

export const useBug = () => {
    const context = useContext(BugContext);
    if (!context) {
        throw new Error("useBug must be used within a BugProvider");
    }
    return context;
};
