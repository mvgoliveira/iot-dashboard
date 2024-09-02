import styled from "styled-components";

interface IContainer {
    size: number;
}

export const Container = styled.div<IContainer>`
    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
    height: ${({ size }) => `${size}px`};
    width: ${({ size }) => `${size}px`};

    margin-top: -15px;

    div {
        margin-bottom: -35px;
    }

    span {
        font-size: ${({ size }) => `${(size * 32) / 250}px`};
    }

    p {
        font-size: ${({ size }) => `${(size * 22) / 250}px`};
    }
`;

export const StyledExternalProgress = styled.div`
    height: 100%;
    width: 100%;
    border-radius: 50%;
    transform: rotate(126.8deg);

    position: absolute;
    z-index: 1;
`;

export const ExternalPercent = styled.div<{
    progressZones: {
        percentageLimit: number;
        color: string;
    }[];
}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    circle {
        fill: none;
        stroke-width: 3;
        stroke-linecap: round;
        stroke-dasharray: 445;
    }
`;

export const StyledInternalProgress = styled.div`
    height: 87%;
    width: 87%;
    border-radius: 50%;
    transform: rotate(130deg);

    position: absolute;

    z-index: 2;
`;

export const InternalPercent = styled.div<{
    progress: number;
    progressZones: {
        percentageLimit: number;
        color: string;
    }[];
}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    circle {
        fill: none;
        stroke-width: 12;
        stroke-linecap: round;
        stroke-dasharray: 440;
    }
`;

export const StyledValue = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 3;
    gap: 5px;

    span {
        line-height: 90%;
    }

    p {
        line-height: 90%;
    }
`;

export const Circle = styled.circle<{
    progress: number;
    progressColor: string;
}>`
    stroke-dashoffset: calc(440 - (220 * ${({ progress }) => progress}) / 100);
    stroke: ${({ progressColor }) => progressColor};
    transition: stroke-dashoffset 2s ease-out;
`;
