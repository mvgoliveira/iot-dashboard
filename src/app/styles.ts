import styled from "styled-components";

export const Container = styled.main`
    width: 100%;
    height: 100vh;
    background: ${({ theme }) => theme.colors.gray100};
    overflow-y: hidden;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
`;
