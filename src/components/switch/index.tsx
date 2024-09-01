import React, { ReactElement } from "react";

import { Container, StyledThumb, StyledSwitch } from "./styles";

type PropTypes = {
    withLabels?: boolean;
    size?: "default" | "small";
    status?: "on" | "off";
    onStateChange?: (checked: boolean) => void;
};

const Switch = ({
    withLabels = false,
    size = "default",
    status,
    onStateChange,
}: PropTypes): ReactElement => {
    return (
        <Container>
            <StyledSwitch
                withLabels={size !== "small" && withLabels}
                size={size}
                checked={status === "on"}
                onCheckedChange={onStateChange}
            >
                <StyledThumb size={size} />
            </StyledSwitch>
        </Container>
    );
};

export { Switch };
