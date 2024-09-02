// WebSocketContext.tsx
import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";

import { useData } from "./dataContext";

type WebSocketContextType = {
    ws: WebSocket | null;
    isConnected: boolean;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

interface IWebSocketProviderProps {
    children: ReactNode;
}

export const WebSocketProvider: React.FC<IWebSocketProviderProps> = ({ children }) => {
    const { setSpaces, setAsset, setTemperature, setEnergies, setNewEnergy } = useData();
    const ws = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:8080");

        ws.current.onopen = () => {
            console.log("WebSocket connected");
            setIsConnected(true);
        };

        ws.current.onclose = () => {
            console.log("WebSocket disconnected");
            setIsConnected(false);
        };

        ws.current.onmessage = event => {
            const data = JSON.parse(event.data);

            if (data.type === "spacesResponse") {
                setSpaces(data.data);
            }

            if (data.type === "assetResponse") {
                setAsset(data.data);
            }

            if (data.type === "temperatureResponse") {
                if (data.data.value) {
                    setTemperature(data.data.value);
                }
            }

            if (data.type === "energiesResponse") {
                setEnergies(data.data);
            }

            if (data.type === "changeEnergyResponse") {
                console.log("changeEnergyResponse");
                setNewEnergy(data.data);
            }
        };

        return () => {
            ws.current?.close();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ ws: ws.current, isConnected }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = (): WebSocketContextType => {
    const context = useContext(WebSocketContext);
    if (context === undefined) {
        throw new Error("useWebSocket must be used within a WebSocketProvider");
    }
    return context;
};
