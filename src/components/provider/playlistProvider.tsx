'use client'

import { DataPlaylist } from '@/types/interfaces';
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

interface PlaylistDataType {
    playlistList: DataPlaylist[]
    setPlaylistList: (playlistList: DataPlaylist[]) => void;
    updatePlaylist: (playlist: DataPlaylist) => void
}

const PlaylistContext = createContext<PlaylistDataType | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(PlaylistContext);
    if (!context) {
        throw new Error("useAppContext must be used within a PlaylistProvider");
    }
    return context;
};

export const PlaylistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [playlistList, setPlaylistListState] = useState<DataPlaylist[]>([]);

    const setPlaylistList = useCallback((playlistList: Array<DataPlaylist>) => {
        setPlaylistListState(playlistList);
    }, []);

    const updatePlaylist = (updatedPlaylist: DataPlaylist) => {
        console.log("updatedPlaylist", updatedPlaylist);
        setPlaylistListState((prevList: DataPlaylist[]) => {
            return prevList.map((playlist) =>
                playlist.playlistId === updatedPlaylist.playlistId
                    ? { ...playlist, ...updatedPlaylist }
                    : playlist
            );
        });
    };

    const value = {
        playlistList,
        setPlaylistList,
        updatePlaylist,
    };

    return (
        <PlaylistContext.Provider value={value}>
            {children}
        </PlaylistContext.Provider>
    );
};
