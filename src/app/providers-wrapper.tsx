"use client";

import { DataProvider } from "@/contexts/dataContext";
import { WebSocketProvider } from "@/contexts/webSocketContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement } from "react";

const queryClient = new QueryClient();

export default function ProvidersWrapper({
    children,
}: {
    children: React.ReactNode;
}): ReactElement {
    return (
        <DataProvider>
            <WebSocketProvider>
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
            </WebSocketProvider>
        </DataProvider>
    );
}
