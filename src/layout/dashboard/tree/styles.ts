import styled, { css } from "styled-components";

export const Root = styled.section`
    ${({ theme }) => css`
        width: 100%;
        height: 100%;
        background: ${theme.colors.gray90};
        overflow: hidden;
        border-right: 1px solid ${theme.colors.gray60};
    `};
`;

export const Header = styled.div`
    width: 100%;
    height: 40px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    background: ${({ theme }) => theme.colors.gray80};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray60};
`;

export const Content = styled.div`
    ${({ theme }) => css`
        width: 100%;
        height: 100%;
        padding: 10px;
        overflow: scroll;
        font-family: ${theme.fontFamily.inter} !important;
        font-size: 14px !important;

        &::-webkit-scrollbar {
            width: 0 !important;
            height: 2px !important;
        }

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
