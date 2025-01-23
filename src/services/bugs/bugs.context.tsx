import React, { createContext, useContext, useState, useEffect } from "react";
import { getMyBugsRequest } from "./bugs.service";
import { IBug } from "types";

interface BugContextProps {
    bugs: IBug[] | null;
    isLoading: boolean;
    error: string | null;
    refreshBugs: () => Promise<void>;
}

const BugContext = createContext<BugContextProps | undefined>(undefined);

export const BugProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [bugs, setBugs] = useState<IBug[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBugs = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const bugs = await getMyBugsRequest();
            setBugs(bugs);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Unknown error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const refreshBugs = async () => {
        await fetchBugs();
    };

    useEffect(() => {
        fetchBugs();
    }, []);

    return (
        <BugContext.Provider
            value={{
                bugs,
                isLoading,
                error,
                refreshBugs,
            }}
        >
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
