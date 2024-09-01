import styled from "styled-components";

export const Root = styled.section`
    width: 100%;
    height: max-content;
    padding: 10px 15px 10px 20px;
    background: ${({ theme }) => theme.colors.gray80};
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
`;

export const StatusContainer = styled.div`
    width: max-content;
    display: flex;
    align-items: center;
    gap: 10px;
`;
