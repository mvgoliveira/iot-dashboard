import { Tooltip } from "@/components/tooltip";
import { Typography } from "@/components/typography";
import { IReactChildren } from "@/interfaces/core";
import React, { ReactNode } from "react";
import { MdArrowLeft, MdFullscreen } from "react-icons/md";

import { Root, Option } from "./styles";

const ServiceBar = ({ children }: IReactChildren): ReactNode => (
    <Root>
        <Tooltip>
            <Tooltip.Trigger>
                <Option>
                    <MdArrowLeft size={18} />
                </Option>
            </Tooltip.Trigger>
            <Tooltip.Content>Voltar a página anterior</Tooltip.Content>
        </Tooltip>

        <Typography tag="h1" fontSize={{ xs: "fs75" }} fontWeight="bold" color="gray20">
            {children}
        </Typography>

        <Tooltip>
            <Tooltip.Trigger>
                <Option>
                    <MdFullscreen size={18} />
                </Option>
            </Tooltip.Trigger>
            <Tooltip.Content>Modo de tela cheia</Tooltip.Content>
        </Tooltip>
    </Root>
);

export { ServiceBar };
