import GaugeChart from "@/components/gauge/default";
import { DualSpinning } from "@/components/loading/dualSpinning";
import { Tooltip } from "@/components/tooltip";
import { Typography } from "@/components/typography";
import { useData } from "@/contexts/dataContext";
import { useWebSocket } from "@/contexts/webSocketContext";
import { Theme } from "@/themes/Theme";
import { useSearchParams } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

import { Root, GaugeContainer, GaugeTitle, SecondaryRoot, ErrorMessage } from "./styles";

const Gauge = (): ReactNode => {
    const [progressData, setProgressData] = useState<number>(0);
    const { temperatureOffsets, temperature, setTemperature } = useData();
    const searchParams = useSearchParams();
    const assetId = searchParams.get("assetId");
    const [status, setStatus] = useState("pending");

    const { ws, isConnected } = useWebSocket();

    const PROGRESS_ZONES = [
        { percentageLimit: 20, color: Theme.colors.cyan300 },
        { percentageLimit: 80, color: Theme.colors.greenA400 },
        { percentageLimit: 100, color: Theme.colors.redA400 },
    ];

    useEffect(() => {
        if (isConnected && ws && assetId) {
            setTemperature(null);
            setStatus("pending");
            ws.send(JSON.stringify({ type: "temperatureRequest", assetId }));
        }
    }, [ws, isConnected, assetId]);

    useEffect(() => {
        try {
            if (temperatureOffsets && assetId && temperature) {
                let offsetMin = temperatureOffsets.min;
                let offsetMax = temperatureOffsets.max;

                let limMin = PROGRESS_ZONES[0].percentageLimit;
                let limMax = PROGRESS_ZONES[1].percentageLimit;

                if (temperature < offsetMin) {
                    limMin = 0;
                    limMax = PROGRESS_ZONES[0].percentageLimit;

                    offsetMax = offsetMin;
                    offsetMin = -10;
                } else if (temperature > offsetMax) {
                    limMin = PROGRESS_ZONES[1].percentageLimit;
                    limMax = 100;

                    offsetMin = offsetMax;
                    offsetMax = 50;
                }

                const progress =
                    limMin +
                    ((temperature - offsetMin) / (offsetMax - offsetMin)) * (limMax - limMin);

                if (progress < 1) {
                    setProgressData(1);
                }

                if (progress > 100) {
                    setProgressData(100);
                }

                setProgressData(progress);

                setStatus("normal");
            }
        } catch (err) {
            setStatus("error");
            console.error(err);
        }

        return () => {
            setProgressData(0);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [temperatureOffsets, assetId, temperature]);

    if (!temperature || status === "pending") {
        return (
            <SecondaryRoot>
                <div style={{ height: "100%" }}>
                    <DualSpinning />
                </div>
            </SecondaryRoot>
        );
    }

    if (!assetId || status === "error") {
        return (
            <SecondaryRoot>
                <Typography
                    tag="span"
                    color="gray30"
                    fontSize={{ xs: "fs100" }}
                    fontWeight="bold"
                    textAlign="center"
                >
                    Aconteceu um erro inesperado!
                    <br />
                    Tente novamente mais tarde!
                </Typography>
            </SecondaryRoot>
        );
    }

    return (
        <Root>
            <GaugeContainer gridArea="1 / 1 / 1 / 1">
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <GaugeChart size={190}>
                        <GaugeChart.External progressZones={PROGRESS_ZONES} />
                        <GaugeChart.Internal
                            progress={progressData}
                            progressZones={PROGRESS_ZONES}
                        />
                        <GaugeChart.Value title={temperature.toFixed(1) || ""} subtitle="ºC" />
                    </GaugeChart>
                </div>

                <GaugeTitle>
                    <Typography
                        tag="span"
                        color="white"
                        fontSize={{ xs: "fs100" }}
                        fontWeight="semibold"
                        textAlign="start"
                    >
                        Temperatura
                    </Typography>

                    <Tooltip>
                        <Tooltip.Trigger>
                            <FaInfoCircle size={15} color={Theme.colors.gray20} />
                        </Tooltip.Trigger>
                        <Tooltip.Content>Temperatura do ambiente em tempo real</Tooltip.Content>
                    </Tooltip>
                </GaugeTitle>
            </GaugeContainer>

            <GaugeContainer gridArea="1 / 2 / 1 / 2">
                {temperature > temperatureOffsets.max && (
                    <ErrorMessage bgColor="red500">
                        <Typography
                            tag="h3"
                            color="white"
                            fontWeight="bold"
                            fontSize={{ xs: "fs75" }}
                        >
                            Temperatura elevada!
                        </Typography>
                        <Typography
                            tag="p"
                            color="white"
                            fontWeight="regular"
                            fontSize={{ xs: "fs75" }}
                        >
                            Diminua a temperatura ou mude o SetPoint de alertas.
                        </Typography>
                    </ErrorMessage>
                )}

                {temperature < temperatureOffsets.min && (
                    <ErrorMessage bgColor="cyanA400">
                        <Typography
                            tag="h3"
                            color="white"
                            fontWeight="bold"
                            fontSize={{ xs: "fs75" }}
                        >
                            Temperatura reduzida!
                        </Typography>
                        <Typography
                            tag="p"
                            color="white"
                            fontWeight="regular"
                            fontSize={{ xs: "fs75" }}
                        >
                            Aumente a temperatura ou mude o SetPoint de alertas.
                        </Typography>
                    </ErrorMessage>
                )}

                <div style={{ display: "flex", gap: 5 }}>
                    <Typography
                        tag="span"
                        color="white"
                        fontWeight="bold"
                        fontSize={{ xs: "fs75" }}
                    >
                        SetPoint Min:
                    </Typography>

                    <Typography
                        tag="p"
                        color="white"
                        fontWeight="regular"
                        fontSize={{ xs: "fs75" }}
                    >
                        {temperatureOffsets.min}ºC
                    </Typography>
                </div>

                <div style={{ display: "flex", gap: 5 }}>
                    <Typography
                        tag="span"
                        color="white"
                        fontWeight="bold"
                        fontSize={{ xs: "fs75" }}
                    >
                        SetPoint Max:
                    </Typography>

                    <Typography
                        tag="p"
                        color="white"
                        fontWeight="regular"
                        fontSize={{ xs: "fs75" }}
                    >
                        {temperatureOffsets.max}ºC
                    </Typography>
                </div>
            </GaugeContainer>
        </Root>
    );
};

export { Gauge };
