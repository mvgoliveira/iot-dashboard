import GaugeChart from "@/components/gauge/default";
import { DualSpinning } from "@/components/loading/dualSpinning";
import { Tooltip } from "@/components/tooltip";
import { Typography } from "@/components/typography";
import { Theme } from "@/themes/Theme";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";
import React, { ReactNode } from "react";
import { FaInfoCircle } from "react-icons/fa";

import { Root, GaugeContainer, GaugeTitle, SecondaryRoot, ErrorMessage } from "./styles";

const PROGRESS_ZONES = [
    { percentageLimit: 20, color: Theme.colors.cyan300 },
    { percentageLimit: 80, color: Theme.colors.greenA400 },
    { percentageLimit: 100, color: Theme.colors.redA400 },
];

const getProgress = (value: number): number => {
    let limMin = PROGRESS_ZONES[0].percentageLimit;
    let limMax = PROGRESS_ZONES[1].percentageLimit;

    let temperatureOffsetMin = 18;
    let temperatureOffsetMax = 28;

    if (value < temperatureOffsetMin) {
        limMin = 0;
        limMax = PROGRESS_ZONES[0].percentageLimit;

        temperatureOffsetMax = temperatureOffsetMin;
        temperatureOffsetMin = -10;
    }

    if (value > temperatureOffsetMax) {
        limMin = PROGRESS_ZONES[1].percentageLimit;
        limMax = 100;

        temperatureOffsetMin = temperatureOffsetMax;
        temperatureOffsetMax = 50;
    }

    const progress =
        limMin +
        ((value - temperatureOffsetMin) / (temperatureOffsetMax - temperatureOffsetMin)) *
            (limMax - limMin);

    if (progress < 1) {
        return 1;
    }

    if (progress > 100) {
        return 100;
    }

    return progress;
};

const Gauge = (): ReactNode => {
    const searchParams = useSearchParams();
    const assetId = searchParams.get("assetId");

    const { status, data } = useQuery({
        queryKey: ["asset", assetId],
        queryFn: async (): Promise<AxiosResponse<Asset>> =>
            axios.get(`http://localhost:4000/assets/${assetId}`),
    });

    if (status === "pending") {
        return (
            <SecondaryRoot>
                <div style={{ height: "100%" }}>
                    <DualSpinning />
                </div>
            </SecondaryRoot>
        );
    }

    if (status === "error") {
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
                            progress={getProgress(data.data.temperature.value)}
                            progressZones={PROGRESS_ZONES}
                        />
                        <GaugeChart.Value
                            title={data.data.temperature.value.toFixed(1)}
                            subtitle="ºC"
                        />
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
                {data.data.temperature.status === "high" && (
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

                {data.data.temperature.status === "low" && (
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
                        18ºC
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
                        28ºC
                    </Typography>
                </div>
            </GaugeContainer>
        </Root>
    );
};

export { Gauge };
