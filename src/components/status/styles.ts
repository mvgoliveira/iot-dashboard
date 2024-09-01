import { Theme } from "@/themes/Theme";
import styled from "styled-components";

export const Root = styled.div`
    width: max-content;
    height: max-content;
    display: flex;
    align-items: center;
    gap: 5px;
`;

export const Circle = styled.span<{ color: keyof typeof Theme.colors }>`
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: ${({ theme, color }) => theme.colors[color]};
`;
