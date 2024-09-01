import React, { createContext, useContext, useEffect, useRef, ReactNode } from "react";

import { DataContextType, useData } from "./dataContext";

type WebSocketContextType = WebSocket | null;

interface IWebSocketProviderProps {
    children: ReactNode;
}

const WebSocketContext = createContext<WebSocketContextType>(null);

export const WebSocketProvider: React.FC<IWebSocketProviderProps> = ({ children }) => {
    const { setSpace } = useData() as DataContextType;

    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:8080");

        ws.current.onopen = () => console.log("WebSocket connected");
        ws.current.onclose = () => console.log("WebSocket disconnected");

        ws.current.onmessage = event => {
            const data = JSON.parse(event.data);

            if (data.type === "spaceResponse") {
                setSpace(data);
            }
        };

        return () => {
            ws.current?.close();
        };
    }, []);

    return <WebSocketContext.Provider value={ws.current}>{children}</WebSocketContext.Provider>;
};

export const useWebSocket = (): WebSocketContextType => {
    return useContext(WebSocketContext);
};
