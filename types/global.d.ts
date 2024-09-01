import { Theme } from "@/themes";

declare global {
    export type ColorIcons = {
        width?: number;
        height?: number;
        color?: keyof typeof Theme.colors;
    };

    export type GridProps = {
        children?: ReactNode;
        height?: string;
        overflow?: boolean;
        padding?: string;
        margin?: string;
        backgroundSource?: string;
        backgroundContent?: string;
        backgroundBaseColor?: string;
        shadow?: boolean;
        darkest?: boolean;
        shadowHeight?: string;
        maxWidth?: string;
    };

    export type Space = {
        id: string;
        name: string;
        assets: [
            {
                id: string;
                spaceId: string;
                name: string;
                temperature: {
                    mac: string;
                    value: number;
                    status: string;
                };
                energies: {
                    name: string;
                    id: string;
                    type: "lampada" | "tomada";
                    status: "on" | "off";
                }[];
            },
        ];
    };

    export type Asset = {
        id: string;
        spaceId: string;
        name: string;
        temperature: {
            mac: string;
            value: number;
            status: string;
        };
        energies: {
            name: string;
            id: string;
            type: "lampada" | "tomada";
            status: "on" | "off";
        }[];
    };
}
