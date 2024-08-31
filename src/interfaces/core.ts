import { ReactNode } from "react";

import { Theme } from "../themes/Theme";

export interface IReactChildren {
    children: ReactNode | ReactNode[];
}

export interface ISVGsDynamicColor {
    fillColor?: keyof typeof Theme.colors;
}

export interface ISVGsDynamicSize {
    width?: number;
    height?: number;
}

export interface ISVGsDynamicColorAndSize extends ISVGsDynamicColor, ISVGsDynamicSize {}

export interface IGridColumnsContent {
    children: ReactNode;
    columns: number;
    columnsTablet: number;
    columnsMobile: number;
}

export interface IGridContainerProps {
    margin: string;
    height: string;
    overflow: number;
    backgroundSource: string;
    backgroundContent: string;
    backgroundBaseColor: string;
}

export interface IContentAlign {
    children: ReactNode;
    gap?: string;
    margin?: string;
    padding?: string;
    contentDirection: string;
    contentAlignMainAxis: string;
    contentAlignSecondaryAxis: string;
}
