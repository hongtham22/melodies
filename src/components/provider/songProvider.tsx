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
    showSidebarRight: boolean | null,
    setShowSidebarRight: (show: boolean) => void;
    showContentSong: boolean | null,
    setShowContentSong: (show: boolean) => void;
    waitingList: boolean | null,
    setWaitingList: (show: boolean) => void;
    valueSkip: string;
    setValueSkip: (value: string) => void
    isSkip: boolean | null;
    setIsSkip: (skip: boolean) => void;
    currentSong: SongData | null;
    setCurrentSong: (song: SongData) => void;
    showLyricPage: boolean | null;
    setShowLyricPage: (show: boolean) => void
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
    const [valueSkip, setValueSkip] = useState<string>('')
    const [isSkip, setIsSkip] = useState<boolean | null>(null)
    const [showSidebarRight, setShowSidebarRight] = useState<boolean | null>(false)
    const [showContentSong, setShowContentSong] = useState<boolean | null>(false)
    const [waitingList, setWaitingList] = useState<boolean | null>(false)
    const [showLyricPage, setShowLyricPage] = useState<boolean | null>(false)

    const value = {
        showSidebarRight,
        setShowSidebarRight,
        waitingList,
        setWaitingList,
        showContentSong,
        setShowContentSong,
        valueSkip,
        setValueSkip,
        isSkip,
        setIsSkip,
        currentSong,
        setCurrentSong,
        showLyricPage,
        setShowLyricPage
    };
    return (
        <SongContext.Provider value={value}>
            {children}
        </SongContext.Provider>
    );
};
