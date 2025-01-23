import React, { createContext, useContext, useState, useEffect } from "react";
import { CreateBugPayload, createBugRequest, deleteBugRequest, getMyBugsRequest, getAllBugsRequest } from "./bugs.service";
import { IBug, IAllBugs } from "types";

interface BugContextProps {
    bugs: IBug[] | null;
    allBugs: IAllBugs[] | null;
    isLoading: boolean;
    error: string | null;
    refreshBugs: () => Promise<void>;
    refreshAllBugs: () => Promise<void>;
    createBug: (payload: CreateBugPayload) => Promise<void>;
    deleteBug: (bugId: string) => Promise<void>;
}

const BugContext = createContext<BugContextProps | undefined>(undefined);

export const BugProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [bugs, setBugs] = useState<IBug[] | null>(null);
    const [allBugs, setAllBugs] = useState<IAllBugs[] | null>(null);
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

    const fetchAllBugs = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const bugs = await getAllBugsRequest();
            setAllBugs(bugs);
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

    const refreshAllBugs = async () => {
        await fetchAllBugs();
    };

    const createBug = async (payload: CreateBugPayload) => {
        setIsLoading(true);
        setError(null);
        try {
            const newBug = await createBugRequest(payload);
            setBugs((prevBugs) => (prevBugs ? [newBug, ...prevBugs] : [newBug])); // Yeni bug'u mevcut listeye ekle
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Unknown error occurred while creating bug");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const deleteBug = async (bugId: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await deleteBugRequest(bugId);
            setBugs((prevBugs) =>
                prevBugs ? prevBugs.filter((bug) => bug._id !== bugId) : null
            );
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Unknown error occurred while deleting bug");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBugs();
    }, []);

    return (
        <BugContext.Provider
            value={{
                bugs,
                allBugs,
                isLoading,
                error,
                refreshBugs,
                refreshAllBugs,
                createBug,
                deleteBug,
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
