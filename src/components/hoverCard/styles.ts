import { Arrow, Trigger, Content } from "@radix-ui/react-hover-card";
import styled, { keyframes } from "styled-components";

const slideUpAndFade = keyframes`
    from {
        opacity: 0;
        transform: translateY(2px);
    }
    
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const slideRightAndFade = keyframes`
    from {
        opacity: 0;
        transform: translateX(-2px);
    }
    
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

const slideDownAndFade = keyframes`
    from {
        opacity: 0;
        transform: translateY(-2px);
    }
    
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const slideLeftAndFade = keyframes`
    from {
        opacity: 0;
        transform: translateX(2px);
    }
    
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const StyledTrigger = styled(Trigger)`
    cursor: pointer;
`;

export const StyledContent = styled(Content)`
    margin-top: 5px;
    width: 300px;
    color: ${({ theme }) => theme.colors.gray40};
    background: ${({ theme }) => theme.colors.gray90};
    box-shadow: hsl(2 06 22% 7% / 35%) 0 10px 38px -10px, hsl(206 22% 7% / 20%) 0 10px 20px -15px;
    z-index: 999;
    border-radius: 6px;

    @media (prefers-reduced-motion: no-preference) {
        animation-duration: 400ms;
        animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        will-change: transform, opacity;

        &[data-state="open"] {
            &[data-side="top"] {
                animation-name: ${slideDownAndFade};
            }

            &[data-side="right"] {
                animation-name: ${slideLeftAndFade};
            }

            &[data-side="bottom"] {
                animation-name: ${slideUpAndFade};
            }

            &[data-side="left"] {
                animation-name: ${slideRightAndFade};
            }
        }
    }
`;

export const StyledContentInternal = styled.div`
    padding: 20px;
    border: 1px solid ${({ theme }) => theme.colors.gray50};
    border-radius: 6px;
`;

export const StyledArrow = styled(Arrow)`
    fill: ${({ theme }) => theme.colors.gray50};
    stroke: ${({ theme }) => theme.colors.gray50};
    stroke-width: 2px;
    z-index: 3;
    width: 10px;
    height: 5px;
`;
