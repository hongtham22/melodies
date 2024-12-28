'use client'

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { DataSong } from '@/types/interfaces';
// Create the context
interface SongContextType {
    showSidebarRight: boolean | null,
    setShowSidebarRight: (show: boolean) => void;
    showContentSong: boolean | null,
    setShowContentSong: (show: boolean) => void;
    showWaitingList: boolean | null,
    setShowWaitingList: (show: boolean) => void;
    showLyricPage: boolean | null;
    setShowLyricPage: (show: boolean) => void;
    currentSong: DataSong | null;
    setCurrentSong: (song: DataSong) => void;
    waitingList: Array<DataSong>;
    setWaitingList: (songs: Array<DataSong>) => void;
    nextSong: () => void;
    previousSong: () => void;
    startTime: number;
    setStartTime: React.Dispatch<React.SetStateAction<number>>;
    addToWaitingList: (song: DataSong) => void;
    addListToWaitingList: (songs: Array<DataSong>) => void;
    isPlaying: boolean;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
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
    const [currentSong, setCurrentSongState] = useState<DataSong | null>(null);
    const [waitingList, setWaitingListState] = useState<Array<DataSong>>([]);
    const [showSidebarRight, setShowSidebarRight] = useState<boolean | null>(false)
    const [showContentSong, setShowContentSong] = useState<boolean | null>(false)
    const [showWaitingList, setShowWaitingList] = useState<boolean | null>(false)
    const [showLyricPage, setShowLyricPage] = useState<boolean | null>(false)
    const [startTime, setStartTime] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const setCurrentSong = useCallback((song: DataSong) => {
        setCurrentSongState(song);
    }, []);

    const setWaitingList = useCallback((songs: Array<DataSong>) => {
        setWaitingListState(songs);
    }, []);

    const nextSong = useCallback(() => {
        if (currentSong && waitingList.length > 0) {
            const currentIndex = waitingList.findIndex((song) => song.id === currentSong.id);
            const nextIndex = (currentIndex + 1) % waitingList.length;
            setCurrentSongState(waitingList[nextIndex]);
        }
    }, [currentSong, waitingList]);

    const previousSong = useCallback(() => {
        if (currentSong && waitingList.length > 0) {
            const currentIndex = waitingList.findIndex((song) => song.id === currentSong.id);
            const previousIndex = (currentIndex - 1 + waitingList.length) % waitingList.length;
            setCurrentSongState(waitingList[previousIndex]);
        }
    }, [currentSong, waitingList]);

    const addToWaitingList = useCallback((song: DataSong) => {
        setWaitingListState((prevList) => [...prevList, song]);
    }, []);
    const addListToWaitingList = useCallback((songs: Array<DataSong>) => {
        setWaitingListState((prevList) => [...prevList, ...songs]);
    }, []);

    const value = {
        showWaitingList,
        setShowWaitingList,
        showSidebarRight,
        setShowSidebarRight,
        waitingList,
        setWaitingList,
        showContentSong,
        setShowContentSong,
        currentSong,
        setCurrentSong,
        showLyricPage,
        setShowLyricPage,
        nextSong,
        previousSong,
        addToWaitingList,
        addListToWaitingList,
        startTime,
        setStartTime,
        isPlaying,
        setIsPlaying
    };
    return (
        <SongContext.Provider value={value}>
            {children}
        </SongContext.Provider>
    );
};
