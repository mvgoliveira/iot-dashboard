import styled from "styled-components";

export const Root = styled.section`
    width: 100%;
    height: 280px;
    background: ${({ theme }) => theme.colors.gray80};
    display: flex;
    height: 280px;
`;

export const SecondaryRoot = styled.section`
    width: 100%;
    height: 502px;
    background: ${({ theme }) => theme.colors.gray80};
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const BoxContainer = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    height: fit-content;
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    padding: 20px;

    &:nth-child(1) {
        border-right: 1px solid ${({ theme }) => theme.colors.gray60};
    }
`;
