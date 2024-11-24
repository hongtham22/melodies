'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Tạo context cho socket
const SocketContext = createContext<Socket | null>(null);

// Hook tùy chỉnh để sử dụng socket
export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocketContext must be used within a SocketProvider');
    }
    return context;
};

// Component SocketProvider cung cấp socket cho các component con
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io('https://1vtglwl3-20099.asse.devtunnels.ms');
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Đã kết nối tới server:', newSocket.id);
        });

        return () => {
            newSocket.disconnect();
            console.log('Đã ngắt kết nối socket');
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
