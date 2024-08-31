import styled, { css } from "styled-components";

export const Root = styled.div`
    ${({ theme }) => css`
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;

        &::-webkit-scrollbar {
            width: 3px !important;
        }

        &::-webkit-scrollbar-track {
            background: transparent !important;
        }

        &::-webkit-scrollbar-thumb {
            background: ${theme.colors.gray50} !important;
        }

        &::-webkit-scrollbar-thumb:hover {
            background: ${theme.colors.gray40} !important;
            cursor: pointer;
        }
    `};
`;
