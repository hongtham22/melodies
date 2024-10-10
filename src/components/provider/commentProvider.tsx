'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CommentDataType {
    replyStatus: boolean | null;
    setReplyStatus: (reply: boolean | null) => void;
}

const CommentContext = createContext<CommentDataType | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(CommentContext);
    if (!context) {
        throw new Error("useAppContext must be used within a CommentProvider");
    }
    return context;
};

export const CommentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [replyStatus, setReplyStatus] = useState<boolean | null>(null);

    const value = {
        replyStatus,
        setReplyStatus,
    };

    return (
        <CommentContext.Provider value={value}>
            {children}
        </CommentContext.Provider>
    );
};
