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
}
