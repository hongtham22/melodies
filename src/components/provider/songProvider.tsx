'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the SongData type to ensure type safety
interface SongData {
    audio: string;
    poster: string;
    name: string;
    artist: string;
}

// Create the context
interface SongContextType {
    currentSong: SongData | null;
    setCurrentSong: (song: SongData) => void;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

// Create a custom hook to use the SongContext
export const useAppContext = () => {
    const context = useContext(SongContext);
    if (!context) {
        throw new Error("useAppContext must be used within a SongProvider");
    }
    return context;
};

// Create the SongProvider component
export const SongProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentSong, setCurrentSong] = useState<SongData | null>(null);

    const value = {
        currentSong,
        setCurrentSong,
    };

    return (
        <SongContext.Provider value={value}>
            {children}
        </SongContext.Provider>
    );
};
