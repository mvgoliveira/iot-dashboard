import { Typography } from "@/components/typography";
import { IReactChildren } from "@/interfaces/core";
import React, { ReactElement } from "react";

import {
    Circle,
    Container,
    ExternalPercent,
    InternalPercent,
    StyledExternalProgress,
    StyledInternalProgress,
    StyledValue,
} from "./styles";

type SizeProps = {
    size?: number;
};

type ValueProps = {
    title: string;
    subtitle: string;
};

type ProgressZoneType = {
    progressZones: {
        percentageLimit: number;
        color: string;
    }[];
};

type ProgressType = {
    progress: number;
};

const GaugeChart = ({ children, size = 250 }: IReactChildren & SizeProps): ReactElement => (
    <Container size={size}>{children}</Container>
);

const External = ({ progressZones }: ProgressZoneType): ReactElement => (
    <StyledExternalProgress>
        <ExternalPercent progressZones={progressZones}>
            <svg viewBox="0 0 95 95">
                <Circle progress={100} progressColor="#424242" cx="47.5" cy="47.5" r="45" />
                {progressZones
                    .slice()
                    .reverse()
                    .map(progressZone => (
                        <Circle
                            progress={
                                progressZone.percentageLimit > 100
                                    ? 100
                                    : progressZone.percentageLimit
                            }
                            progressColor={progressZone.color}
                            cx="47.5"
                            cy="47.5"
                            r="45"
                        />
                    ))}
            </svg>
        </ExternalPercent>
    </StyledExternalProgress>
);
External.displayName = "External";
GaugeChart.External = External;

const Internal = ({ progress, progressZones }: ProgressType & ProgressZoneType): ReactElement => {
    function getProgressColor() {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < progressZones.length; i++) {
            const zone = progressZones[i];
            if (progress <= zone.percentageLimit) {
                return zone.color;
            }
        }

        return progressZones[progressZones.length - 1].color;
    }

    return (
        <StyledInternalProgress>
            <InternalPercent progress={progress} progressZones={progressZones}>
                <svg viewBox="0 0 103 103">
                    <Circle progress={100} progressColor="#424242" cx="51.4" cy="51.4" r="45" />
                    <Circle
                        progress={progress > 100 ? 100 : progress}
                        progressColor={getProgressColor()}
                        cx="51.4"
                        cy="51.4"
                        r="45"
                    />
                    {/* {progressZones
                        .slice()
                        .reverse()
                        .map(progressZone => (
                            <Circle
                                progress={
                                    progressZone.percentageLimit > 100
                                        ? 100
                                        : progressZone.percentageLimit
                                }
                                progressColor={progressZone.color}
                                cx="51.4"
                                cy="51.4"
                                r="45"
                            />
                        ))} */}
                </svg>
            </InternalPercent>
        </StyledInternalProgress>
    );
};
Internal.displayName = "Internal";
GaugeChart.Internal = Internal;

const Value = ({ title, subtitle }: ValueProps): ReactElement => (
    <StyledValue>
        <Typography tag="span" fontSize={{ xs: "fs400" }} color="white" fontWeight="bold">
            {title}
        </Typography>

        <Typography tag="p" fontSize={{ xs: "fs200" }} color="gray30" fontWeight="regular">
            {subtitle}
        </Typography>
    </StyledValue>
);
Value.displayName = "Value";
GaugeChart.Value = Value;

export default GaugeChart;
