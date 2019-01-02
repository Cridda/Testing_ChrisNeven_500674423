import React, { SFC } from 'react';
import styled from 'styled-components';

interface Props {
    fill?: string;
    handleOnToggle: () => void;
}

const ToggleButton: SFC<Props> = ({ fill, handleOnToggle }: Props) => {
    return (
        <Container onClick={() => handleOnToggle()}>
            <svg width="4" height="18" viewBox="0 0 4 18">
                <path
                    d="M2 4C.895431 4 0 3.1045695 0 2s.895431-2 2-2c1.104569 0 2 .8954305 2 2s-.895431 2-2 2zm0 7c-1.104569 0-2-.8954305-2-2s.895431-2 2-2c1.104569 0 2 .8954305 2 2s-.895431 2-2 2zm0 7c-1.104569 0-2-.8954305-2-2s.895431-2 2-2c1.104569 0 2 .8954305 2 2s-.895431 2-2 2z"
                    fill={fill || '#FFF'}
                    fillRule="evenodd"
                />
            </svg>
        </Container>
    );
};

const Container = styled.div`
    position: absolute;
    height: 100%;
    cursor: pointer;
    padding: 0 1.6rem;
    display: flex;
    align-items: center;
    z-index: 1;
    right: 0;
`;

export default ToggleButton;
