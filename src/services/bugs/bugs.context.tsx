import React, { createContext, useContext, useState, useEffect } from "react";
import { createBugRequest, deleteBugRequest, getMyBugsRequest, getAllBugsRequest, updateBugRequest, addfavorirequest, getAllFavroites } from "./bugs.service";
import { IBug, IAllBugs, CreateBugPayload } from "types";

interface BugContextProps {
    bugs: IBug[] | null;
    allBugs: IAllBugs[] | null;
    allFavorites: IAllBugs[] | null;
    isLoading: boolean;
    error: string | null;
    refreshBugs: () => Promise<void>;
    refreshAllBugs: () => Promise<void>;
    refreshAllFavorites: () => Promise<void>;
    updateBug: (bugId: string, updatedFields: Partial<IBug>) => Promise<void>;
    addFavroites: (updatedFields: IBug) => Promise<void>;
    createBug: (payload: CreateBugPayload) => Promise<void>;
    deleteBug: (bugId: string) => Promise<void>;
}

const BugContext = createContext<BugContextProps | undefined>(undefined);

export const BugProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [bugs, setBugs] = useState<IBug[] | null>(null);
    const [allBugs, setAllBugs] = useState<IAllBugs[] | null>(null);
    const [allFavorites, setallFavorites] = useState<IAllBugs[] | null>(null);
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

    const fetchAllFavorites = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const bugs = await getAllFavroites();
            setallFavorites(bugs);

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
    const refreshAllFavorites = async () => {
        await fetchAllFavorites();
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

    const updateBug = async (bugId: string, updatedFields: Partial<IBug>) => {
        setIsLoading(true);
        setError(null);
        try {
            const updatedBug = await updateBugRequest(bugId, updatedFields);
            setBugs((prevBugs) =>
                prevBugs ? prevBugs.map((bug) => (bug._id === bugId ? { ...bug, ...updatedFields } : bug)) : null
            );
            console.log("Bug updated successfully");
        } catch (error) {
            console.error("Error while updating bug:", error);
            setError("Failed to update bug");
        } finally {
            setIsLoading(false);
        }
    };

    const addFavroites = async (updatedFields: IBug) => {
        setIsLoading(true);
        setError(null);
        try {
            await addfavorirequest(updatedFields);

            console.log("Bug added to favroites successfully");
        } catch (error) {
            console.error("Error while addfavrites bug:", error);
            setError("Failed to favoritesAdd bug");
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
                allFavorites,
                isLoading,
                error,
                refreshBugs,
                refreshAllBugs,
                createBug,
                updateBug,
                addFavroites,
                refreshAllFavorites,
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
