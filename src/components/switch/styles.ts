import { Root, Thumb } from "@radix-ui/react-switch";
import styled, { css } from "styled-components";

export const Container = styled.div`
    width: max-content;
    display: flex;
    align-items: center;
    gap: 15px;
`;

export const StyledSwitch = styled(Root)<{ withLabels: boolean; size: string }>`
    all: unset;
    background-color: ${({ theme }) => theme.colors.gray60};
    border-radius: 9999px;
    position: relative;
    -webkit-tap-highlight-color: ${({ theme }) => theme.colors.gray80};
    display: flex;
    align-items: center;

    ${({ size }) =>
        size !== "small"
            ? css`
                  width: 42px;
                  height: 22px;
              `
            : css`
                  width: 30px;
                  height: 18px;
              `}

    &:hover {
        cursor: pointer;
    }

    &[data-state="checked"] {
        background-color: ${({ theme }) => theme.colors.purpleA400};
    }

    ${({ withLabels }) =>
        withLabels
            ? css`
                  &:before {
                      position: absolute;
                      content: "ON";
                      font-family: ${({ theme }) => theme.fontFamily.inter};
                      font-size: 8px;
                      color: ${({ theme }) => theme.colors.white};
                      left: 5px;
                  }

                  &:after {
                      position: absolute;
                      content: "OFF";
                      font-family: ${({ theme }) => theme.fontFamily.inter};
                      font-size: 8px;
                      color: ${({ theme }) => theme.colors.white};
                      right: 4px;
                  }
              `
            : undefined}
`;

export const StyledThumb = styled(Thumb)<{ size: string }>`
    display: block;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 9999px;
    transition: transform 100ms;
    transform: translateX(2px);
    will-change: transform;

    ${({ size }) =>
        size !== "small"
            ? css`
                  width: 18px;
                  height: 18px;

                  &[data-state="checked"] {
                      transform: translateX(22px);
                  }
              `
            : css`
                  width: 12px;
                  height: 12px;

                  &[data-state="checked"] {
                      transform: translateX(16px);
                  }
              `}
`;
