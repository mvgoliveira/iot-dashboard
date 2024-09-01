import { IReactChildren } from "@/interfaces/core";
import { Theme } from "@/themes/Theme";
import React, { ReactElement } from "react";

import { TagBase } from "./styles";

interface ITagProps extends IReactChildren {
    bgColor?: keyof typeof Theme.colors;
    fontColor?: keyof typeof Theme.colors;
}

const Tag = ({
    children,
    bgColor = "purpleA400",
    fontColor = "white",
}: ITagProps): ReactElement => (
    <TagBase bgColor={bgColor} fontColor={fontColor}>
        {children}
    </TagBase>
);

export { Tag };
