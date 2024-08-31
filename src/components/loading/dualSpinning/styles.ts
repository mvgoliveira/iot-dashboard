import styled, { keyframes } from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DualSpinningRotate = keyframes`
    from { transform: rotate(0deg) }
    to { transform: rotate(360deg) }
`;

const PrixClipFix = keyframes`
    0% { clip-path:polygon(50% 50%,0 0, 0 0, 0 0, 0 0, 0 0) }
    50% { clip-path:polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0) }
    75%, 100% { clip-path:polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%) }
`;

export const StyledDualSpinning = styled.span`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    position: relative;
    animation: ${DualSpinningRotate} 1s linear infinite;

    &::before,
    &::after {
        content: "";
        box-sizing: border-box;
        position: absolute;
        inset: 0;
        border-radius: 50%;
        border: 5px solid ${({ theme }) => theme.colors.white};
        animation: ${PrixClipFix} 2s linear infinite;
    }

    &::after {
        inset: 8px;
        transform: rotate3d(90, 90, 0, 180deg);
        border-color: ${({ theme }) => theme.colors.greenA400};
    }
`;
