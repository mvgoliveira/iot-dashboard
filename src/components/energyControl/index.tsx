import { Switch } from "@/components/switch";
import { Typography } from "@/components/typography";
import { useWebSocket } from "@/contexts/webSocketContext";
import { Theme } from "@/themes";
import { useSearchParams } from "next/navigation";
import React, { ReactElement, useEffect, useState } from "react";
import { HiLightBulb } from "react-icons/hi";
import { MdLightbulbOutline, MdOutlinePowerOff, MdPower } from "react-icons/md";

import { Container, IconContainer, TitleContainer } from "./styles";

type PropTypes = {
    id: string;
    name: string;
    type: "lampada" | "tomada";
    defaultState?: "on" | "off";
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EnergyControl = ({ defaultState, name, id, type }: PropTypes): ReactElement => {
    const searchParams = useSearchParams();
    const assetId = searchParams.get("assetId");

    const { ws, isConnected } = useWebSocket();

    const [state, setState] = useState<"on" | "off">("off");

    useEffect(() => {
        if (defaultState) {
            setState(defaultState);
        }

        return () => {
            setState("off");
        };
    }, [defaultState]);

    const onStateChange = (checked: boolean) => {
        const status = checked ? "on" : "off";

        if (isConnected && ws?.readyState === WebSocket.OPEN)
            ws.send(JSON.stringify({ type: "changeEnergyRequest", assetId, energyId: id, status }));

        setState(status);
    };

    return (
        <Container>
            <div style={{ display: "flex", gap: 10 }}>
                <IconContainer>
                    {type === "lampada" ? (
                        <>
                            {state === "on" ? (
                                <HiLightBulb color={Theme.colors.white} size={20} />
                            ) : (
                                <MdLightbulbOutline color={Theme.colors.white} size={16} />
                            )}
                        </>
                    ) : (
                        <>
                            {state === "on" ? (
                                <MdPower color={Theme.colors.white} size={20} />
                            ) : (
                                <MdOutlinePowerOff color={Theme.colors.white} size={20} />
                            )}
                        </>
                    )}
                </IconContainer>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <TitleContainer>
                        <Typography
                            tag="span"
                            color="gray10"
                            fontSize={{ xs: "fs75" }}
                            fontWeight="bold"
                            textAlign="start"
                        >
                            {name}
                        </Typography>
                    </TitleContainer>

                    <Typography
                        tag="span"
                        color="gray50"
                        fontSize={{ xs: "fs50" }}
                        fontWeight="bold"
                        textAlign="start"
                    >
                        {type}
                    </Typography>
                </div>
            </div>

            <Switch withLabels status={state} onStateChange={onStateChange} />
        </Container>
    );
};

export { EnergyControl };
