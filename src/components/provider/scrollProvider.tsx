'use client'
import { createContext, useRef, useContext } from "react";

// Tạo context để chia sẻ ref
const ScrollContext = createContext<{ scrollAreaRef: React.RefObject<HTMLDivElement> | null }>({
    scrollAreaRef: null,
});

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
    const scrollAreaRef = useRef<HTMLDivElement | null>(null);

    return (
        <ScrollContext.Provider value={{ scrollAreaRef }}>
            {children}
        </ScrollContext.Provider>
    );
};

// Hook để sử dụng ScrollContext
export const useScrollArea = () => useContext(ScrollContext);
