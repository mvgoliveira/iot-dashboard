import styled, { keyframes } from "styled-components";

const Spin = keyframes`
    from { transform: rotate(0deg) } 
    to { transform: rotate(360deg) }
`;

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Loading = styled.div`
    border: 3px solid ${({ theme }) => theme.colors.white};
    border-top: 3px solid ${({ theme }) => theme.colors.greenA400};
    border-radius: 50%;
    width: 22px;
    height: 22px;
    animation: ${Spin} 1s linear infinite;
`;
