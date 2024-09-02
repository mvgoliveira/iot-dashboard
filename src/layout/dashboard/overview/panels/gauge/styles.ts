import { Theme } from "@/themes";
import { hexToRgba } from "@/utils/hexToRgba";
import styled, { css } from "styled-components";

export const Root = styled.section`
    width: 100%;
    height: 280px;
    background: ${({ theme }) => theme.colors.gray80};
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 280px;
`;

export const SecondaryRoot = styled.section`
    width: 100%;
    height: 280px;
    background: ${({ theme }) => theme.colors.gray80};
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const GaugeContainer = styled.div<{ gridArea: string }>`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;
    padding: 20px;
    grid-area: ${({ gridArea }) => gridArea};

    &:nth-child(1) {
        border-right: 1px solid ${({ theme }) => theme.colors.gray60};
    }
`;

export const GaugeTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;

export const ErrorMessage = styled.div<{ bgColor: keyof typeof Theme.colors }>`
    ${({ theme, bgColor }) => css`
        width: 100%;
        height: max-content;
        padding: 20px;
        border-radius: 7px;
        border: 1px solid ${theme.colors[bgColor]};
        background: ${hexToRgba(theme.colors[bgColor], 40)};
        display: flex;
        flex-direction: column;
        gap: 5px;
    `}
`;
