import { IReactChildren } from "@interfaces/core";
import { Root, Portal } from "@radix-ui/react-hover-card";
import type {
    Root as RootPropTypes,
    Trigger as TriggerPropTypes,
    Content as ContentPropTypes,
} from "@radix-ui/react-hover-card";
import React, { ReactElement, ComponentProps } from "react";

import { StyledContent, StyledContentInternal, StyledArrow, StyledTrigger } from "./styles";

const HoverCard = ({
    children,
    ...props
}: ComponentProps<typeof RootPropTypes & IReactChildren>): ReactElement => (
    <Root {...props}>{children}</Root>
);

const Trigger = ({
    children,
    ...props
}: ComponentProps<typeof TriggerPropTypes & IReactChildren>): ReactElement => (
    <StyledTrigger asChild {...props}>
        {children}
    </StyledTrigger>
);
Trigger.displayName = "Trigger";
HoverCard.Trigger = Trigger;

const Content = ({
    children,
    ...props
}: ComponentProps<typeof ContentPropTypes & IReactChildren>): ReactElement => (
    <StyledContent>
        <Portal>
            <StyledContent {...props}>
                <StyledContentInternal>{children}</StyledContentInternal>
                <StyledArrow offset={5} width={10} height={7} />
            </StyledContent>
        </Portal>
    </StyledContent>
);
Content.displayName = "Content";
HoverCard.Content = Content;

export { HoverCard };
