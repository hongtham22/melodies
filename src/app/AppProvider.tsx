'use client'

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
interface AppContextType {
    search: string,
    setSearch: (search: string) => void
    loading: boolean,
    setLoading: (loading: boolean) => void
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

export const AppProvider: React.FC<{
    children: ReactNode
    initialAccessToken?: string
    initialRole?: string
}> = ({
    children,
    initialAccessToken = '',
    initialRole = ''
}) => {
        const [loading, setLoading] = useState<boolean>(false)
        const [search, setSearch] = useState<string>('')
        const [role, setRole] = useState<string>(() => {
            return typeof window !== "undefined" ? Cookies.get('role') || "" : initialRole;
        });

        const [accessToken, setAccessToken] = useState<string>(() => {
            return typeof window !== "undefined" ? Cookies.get('accessToken') || "" : initialAccessToken;
        });

        useEffect(() => {
            if (accessToken && role) {
                Cookies.set('role', role, { expires: 7 }); // Expire in 7 days
                Cookies.set('accessToken', accessToken, { expires: 7 }); // Expire in 7 days
            } else {
                Cookies.remove('accessToken');
                Cookies.remove('role');
            }
        }, [accessToken, role]);

        const value = {
            search,
            setSearch,
            loading,
            setLoading,
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
