import { IReactChildren } from "@/interfaces/core";
import {
    Provider,
    Root as TooltipRoot,
    TooltipContentProps,
    TooltipProviderProps,
    TooltipTriggerProps,
} from "@radix-ui/react-tooltip";
import React, { ReactElement } from "react";

import { TooltipTrigger, TooltipContent, TooltipArrow } from "./styles";

const Tooltip = ({ children, ...props }: IReactChildren & TooltipProviderProps): ReactElement => (
    <Provider delayDuration={500} skipDelayDuration={300} {...props}>
        <TooltipRoot>{children}</TooltipRoot>
    </Provider>
);

const Trigger = ({ children, ...props }: IReactChildren & TooltipTriggerProps): ReactElement => (
    <TooltipTrigger {...props}>{children}</TooltipTrigger>
);
Trigger.displayName = "Trigger";
Tooltip.Trigger = Trigger;

const Content = ({ children, ...props }: IReactChildren & TooltipContentProps): ReactElement => (
    <TooltipContent align="center" {...props}>
        {children}
        <TooltipArrow offset={0} width={10} height={0} />
    </TooltipContent>
);
Content.displayName = "Content";
Tooltip.Content = Content;

export { Tooltip };
