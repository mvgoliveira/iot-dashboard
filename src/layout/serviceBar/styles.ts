import styled from "styled-components";

export const Root = styled.section`
    width: 100%;
    min-height: 40px;
    padding: 0 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    background: ${({ theme }) => theme.colors.gray80};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray60};
`;
