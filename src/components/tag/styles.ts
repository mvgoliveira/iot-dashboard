import styled, { css } from "styled-components";

export const TagBase = styled.span<{ bgColor: string; fontColor: string }>`
    ${({ theme, bgColor, fontColor }) => css`
        text-align: center;
        border-radius: 999px;
        width: max-content;
        color: ${theme.colors[fontColor as keyof typeof theme.colors]};
        background-color: ${theme.colors[bgColor as keyof typeof theme.colors]};
        font-family: ${theme.fontFamily.inter};
        font-size: ${theme.fontSize.fs75};
        font-weight: ${theme.fontWeight.medium};
        padding: 5px 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    `}
`;
