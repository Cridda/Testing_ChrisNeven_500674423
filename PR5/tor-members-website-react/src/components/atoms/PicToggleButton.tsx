import styled from 'styled-components';
export const PicToggleButton = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: calc(50% - 2.5rem);
    bottom: 2rem;
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.dark.eerie};
    box-shadow: 5px 10px 53px 0px rgba(0, 0, 0, 0.75);
    cursor: pointer;
`;
