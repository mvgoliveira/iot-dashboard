import { Typography } from "@/components/typography";
import { IReactChildren } from "@/interfaces/core";
import React, { ReactNode } from "react";

import { Root } from "./styles";

const ServiceBar = ({ children }: IReactChildren): ReactNode => (
    <Root>
        <Typography tag="h1" fontSize={{ xs: "fs75" }} fontWeight="bold" color="gray20">
            {children}
        </Typography>
    </Root>
);

export { ServiceBar };
