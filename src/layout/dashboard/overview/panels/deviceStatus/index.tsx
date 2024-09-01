import { BlinkAnimation } from "@/components/animations";
import { HoverCard } from "@/components/hoverCard";
import { Status } from "@/components/status";
import { Tooltip } from "@/components/tooltip";
import { Typography } from "@/components/typography";
import { useSearchParams } from "next/navigation";
import React, { ReactElement, useEffect, useState } from "react";
import {
    MdSignalWifiStatusbarConnectedNoInternet2,
    MdWifi,
    MdOutlineDisplaySettings,
} from "react-icons/md";

import { Root, StatusContainer } from "./styles";

const DeviceStatus = (): ReactElement => {
    const searchParams = useSearchParams();
    const mac = searchParams.get("mac");

    const [isOnline, setIsOnline] = useState(false);

    const signal = -45;

    useEffect(() => {
        if (mac) {
            setIsOnline(true);
        }

        return () => {
            setIsOnline(false);
        };
    }, [mac]);

    return (
        <Root>
            <Typography tag="span" color="white" fontSize={{ xs: "fs75" }} fontWeight="regular">
                MAC: {mac ?? "Indefinido"}
            </Typography>

            <StatusContainer>
                {isOnline ? (
                    <Status animate color="greenA400" text="Online" />
                ) : (
                    <BlinkAnimation>
                        <Tooltip>
                            <Tooltip.Trigger>
                                <Status animate color="red500" text="Offline" />
                            </Tooltip.Trigger>
                            <Tooltip.Content>Offline (Último RSSI: {signal} mDb)</Tooltip.Content>
                        </Tooltip>
                    </BlinkAnimation>
                )}

                {isOnline && signal <= -75 && (
                    <BlinkAnimation>
                        <Tooltip>
                            <Tooltip.Trigger>
                                <MdSignalWifiStatusbarConnectedNoInternet2
                                    size={16}
                                    color="white"
                                />
                            </Tooltip.Trigger>
                            <Tooltip.Content>Conexão instável ({signal} mDb)</Tooltip.Content>
                        </Tooltip>
                    </BlinkAnimation>
                )}

                {isOnline && signal >= -74 && signal <= -65 && (
                    <Tooltip>
                        <Tooltip.Trigger>
                            <MdSignalWifiStatusbarConnectedNoInternet2 size={16} color="white" />
                        </Tooltip.Trigger>
                        <Tooltip.Content>Conexão fraca ({signal} mDb)</Tooltip.Content>
                    </Tooltip>
                )}

                {isOnline && signal >= -64 && (
                    <Tooltip>
                        <Tooltip.Trigger>
                            <MdWifi size={16} color="white" />
                        </Tooltip.Trigger>
                        <Tooltip.Content>Conexão estável ({signal} mDb)</Tooltip.Content>
                    </Tooltip>
                )}

                <HoverCard>
                    <HoverCard.Trigger asChild>
                        <div style={{ display: "block" }}>
                            <MdOutlineDisplaySettings size={16} color="white" />
                        </div>
                    </HoverCard.Trigger>
                    <HoverCard.Content>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <Typography tag="span" fontSize={{ xs: "fs75" }} color="white">
                                <strong>Pulse Liters:</strong> 10 L/p
                            </Typography>
                            <Typography tag="span" fontSize={{ xs: "fs75" }} color="white">
                                <strong>Versão:</strong> 1.1.3
                            </Typography>
                        </div>
                    </HoverCard.Content>
                </HoverCard>
            </StatusContainer>
        </Root>
    );
};

export { DeviceStatus };
