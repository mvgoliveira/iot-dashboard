import styled, { css } from "styled-components";

export const Container = styled.div`
    display: flex;
    width: 100%;
    max-width: 240px;
    height: fit-content;
    padding: 10px;
    align-items: center;
    justify-content: space-between;
    gap: 30px;

    ${({ theme }) => css`
        border: 1px solid ${theme.colors.gray60};
        border-radius: 4px;
    `}
`;

export const IconContainer = styled.div`
    width: 32px;
    height: 32px;
    display: flex;
    flex-direction: column;
    padding: 5px;
    align-items: center;
    justify-content: center;

    ${({ theme }) => css`
        border: 1px solid ${theme.colors.gray60};
        background: ${theme.colors.gray70};
        border-radius: 4px;
    `}
`;

export const TitleContainer = styled.div`
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    ${({ theme }) => css`
        color: ${theme.colors.white};
    `}
`;
