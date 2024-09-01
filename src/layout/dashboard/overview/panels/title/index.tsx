import { Typography } from "@/components/typography";
import React, { ReactElement } from "react";

import { Root } from "./styles";

const TitleSection = ({ title }: { title: string }): ReactElement => {
    return (
        <Root>
            <Typography tag="span" color="white" fontSize={{ xs: "fs100" }} fontWeight="bold">
                {title}
            </Typography>
        </Root>
    );
};

export { TitleSection };
