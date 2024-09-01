import { BlinkAnimation } from "@/components/animations";
import { Typography } from "@/components/typography";
import { Theme } from "@/themes/Theme";
import React, { ReactElement } from "react";

import { Root, Circle } from "./styles";

interface IStatus {
    animate?: boolean;
    color?: keyof typeof Theme.colors;
    text?: string;
}

const Status = ({ animate, color = "greenA400", text = "" }: IStatus): ReactElement => {
    if (animate) {
        return (
            <BlinkAnimation>
                <Root>
                    <Circle color={color} />
                    <Typography
                        tag="span"
                        color={color}
                        fontSize={{ xs: "fs50" }}
                        fontWeight="medium"
                    >
                        {text}
                    </Typography>
                </Root>
            </BlinkAnimation>
        );
    }

    return (
        <Root>
            <Circle color={color} />
            <Typography tag="span" color={color} fontSize={{ xs: "fs50" }} fontWeight="medium">
                {text}
            </Typography>
        </Root>
    );
};

export { Status };
