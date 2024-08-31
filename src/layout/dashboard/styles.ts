import styled from "styled-components";

export const Root = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 330px auto;
    background: ${({ theme }) => theme.colors.gray70};
`;
