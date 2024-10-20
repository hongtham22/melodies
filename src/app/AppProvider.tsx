'use client'

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AppContextType {
    role: string | null,
    setRole: (role: string) => void;
    accessToken: string | null,
    setAccessToken: (token: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {

    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within a SongProvider");
    }
    return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [role, setRole] = useState<string>("");
    const [accessToken, setAccessToken] = useState<string>("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedRole = localStorage.getItem('role') || "";
            const savedAccessToken = localStorage.getItem('accessToken') || "";
            setRole(savedRole);
            setAccessToken(savedAccessToken);
        }
    }, []);

    useEffect(() => {
        if (accessToken && role) {
            localStorage.setItem("role", role);
            localStorage.setItem("accessToken", accessToken);
        } else {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("role");
        }
    }, [accessToken, role]);

    const value = {
        role,
        setRole,
        accessToken,
        setAccessToken
    };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
