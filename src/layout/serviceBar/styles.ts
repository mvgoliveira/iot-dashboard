import styled from "styled-components";

export const Root = styled.section`
    width: 100%;
    height: 40px;
    padding: 0 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    background: ${({ theme }) => theme.colors.gray80};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray60};
`;

export const Option = styled.div`
    all: unset;
    background: none;
    border: 1px solid ${({ theme }) => theme.colors.gray60};
    border-radius: 5px;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.gray40};
    cursor: pointer;
    transition: 0.1s ease-out;

    &:hover {
        background: ${({ theme }) => theme.colors.gray70};
        border: 1px solid ${({ theme }) => theme.colors.gray20};
        color: ${({ theme }) => theme.colors.gray20};
        transition: 0.2s ease-in;
    }
`;
