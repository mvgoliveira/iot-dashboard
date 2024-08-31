import { Theme } from "@/themes/Theme";
import { hexToRgba } from "@/utils/hexToRgba";
import * as Collapsible from "@radix-ui/react-collapsible";
import styled from "styled-components";

export const StyledRoot = styled(Collapsible.Root)`
    width: 100%;
    background: transparent;
    overflow: hidden;
`;

export const StyledTrigger = styled.div<{ selected: boolean }>`
    width: 100%;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0 0 5px;
    border-radius: 5px;
    color: ${({ theme }) => theme.colors.white};
    background: ${({ selected, theme }) =>
        selected ? hexToRgba(theme.colors.purpleA400, 25) : "transparent"};
    border: ${({ selected, theme }) =>
        selected ? `1px solid ${theme.colors.purpleA400}` : "1px solid transparent"};
    transition: 0.1s ease-in;

    &:hover {
        background: ${({ theme }) => hexToRgba(theme.colors.purpleA400, 25)};
        border: 1px solid ${({ theme }) => theme.colors.purpleA400};
        cursor: pointer;
        transition: 0.1s ease-in;
    }
`;

export const CollapsibleTrigger = styled(Collapsible.Trigger)`
    height: 35px;
    width: 100%;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${({ theme }) => theme.colors.gray20};

    > .value {
        width: 100%;
        display: block;
        flex-wrap: wrap;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
`;

export const StyledContent = styled(Collapsible.Content)`
    padding: 0;
    margin-left: 19px;
    border-left: 1px solid ${({ theme }) => theme.colors.gray70};
`;

export const StyledNode = styled.div`
    min-height: 35px;
    padding: 0;
    width: 100%;
`;

export const StyledLeef = styled.div<{ selected: boolean }>`
    width: calc(100% - 20px);
    height: 35px;
    padding: 0 0 0 14px;
    display: flex;
    align-items: center;
    margin-left: 20px;
    justify-content: space-between;
    color: ${({ theme }) => theme.colors.white};
    background: ${({ selected, theme }) =>
        selected ? hexToRgba(theme.colors.purpleA400, 25) : "transparent"};
    border: ${({ selected, theme }) =>
        selected ? `1px solid ${theme.colors.purpleA400}` : "1px solid transparent"};

    &:hover {
        background: ${({ theme }) => hexToRgba(theme.colors.purpleA400, 25)};
        border: 1px solid ${({ theme }) => theme.colors.purpleA400};
        cursor: pointer;
    }
`;

export const StyledDropdownContainer = styled.div`
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Icon = styled.span<{ $bgColor: keyof typeof Theme.colors }>`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme, $bgColor }) => theme.colors[$bgColor]};
    padding: 3px;
    border-radius: 5px;
`;
