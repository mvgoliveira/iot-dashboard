import { Trigger, Content, Arrow } from "@radix-ui/react-tooltip";
import styled, { css } from "styled-components";

export const TooltipTrigger = styled(Trigger)`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const TooltipContent = styled(Content)`
    ${({ theme }) => css`
        color: ${theme.colors.gray80};
        font-size: ${theme.fontSize.fs75};
        font-weight: ${theme.fontWeight.regular};
        line-height: ${theme.lineHeight.fs75};
        letter-spacing: ${theme.letterSpacing.fs75};
        background: ${theme.colors.gray10};
        border: 1px solid ${theme.colors.gray10};
        box-shadow: 0 0 2px #ccc;
        font-family: ${theme.fontFamily.inter};
        padding: 8px 14px;
        border-radius: 5px;
        width: max-content;
        max-width: 320px;
        display: flex;
        flex-flow: row wrap;
        gap: 7px;
        z-index: 999;

        @media (max-width: 400px) {
            width: 300px;
        }
    `}
`;

export const TooltipArrow = styled(Arrow)`
    fill: ${({ theme }) => theme.colors.gray10};
    stroke: ${({ theme }) => theme.colors.gray10};
    stroke-width: 2px;
    z-index: 3;
    width: 10px;
    height: 5px;
`;
