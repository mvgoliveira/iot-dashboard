import styled from "styled-components";

export const Root = styled.section`
    width: 100%;
    height: 124px;
    background: ${({ theme }) => theme.colors.gray80};
    padding: 16px 20px;
`;

export const SecondaryRoot = styled.section`
    width: 100%;
    height: 124px;
    background: ${({ theme }) => theme.colors.gray80};
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const TagContainer = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 10px;
`;

export const DetailsContainer = styled.div`
    width: 100%;
    height: max-content;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
