"use client";

import { ReactElement } from "react";
import { ThemeProvider } from "styled-components";

import { Theme } from "../themes";

export default function ClientThemeWrapper({
    children,
}: {
    children: React.ReactNode;
}): ReactElement {
    return <ThemeProvider theme={Theme}>{children}</ThemeProvider>;
}
