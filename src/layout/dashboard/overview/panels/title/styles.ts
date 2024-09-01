import styled from "styled-components";

export const Root = styled.section`
    width: 100%;
    height: max-content;
    padding: 10px 15px 10px 20px;
    background: ${({ theme }) => theme.colors.gray70};
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
`;
