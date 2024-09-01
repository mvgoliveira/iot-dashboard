"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement } from "react";

const queryClient = new QueryClient();

export default function ProvidersWrapper({
    children,
}: {
    children: React.ReactNode;
}): ReactElement {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
