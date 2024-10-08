import type { Metadata } from "next";
import "./globals.css";
import { ReactElement } from "react";

import StyledComponentsRegistry from "../lib/registry";
import ClientThemeWrapper from "./client-theme-wrapper";
import { inter, space } from "./fonts";
import ProvidersWrapper from "./providers-wrapper";

export const metadata: Metadata = {
    title: "Monitor - Dashboard",
    description: "IoT Monitor Dashboard",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): ReactElement {
    return (
        <html lang="pt-br">
            <body className={`${inter.className} ${space.className}`}>
                <ProvidersWrapper>
                    <StyledComponentsRegistry>
                        <ClientThemeWrapper>{children}</ClientThemeWrapper>
                    </StyledComponentsRegistry>
                </ProvidersWrapper>
            </body>
        </html>
    );
}
