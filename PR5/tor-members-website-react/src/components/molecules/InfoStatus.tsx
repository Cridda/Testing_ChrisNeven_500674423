import React from 'react';
import styled from 'styled-components';
import Checkbox from '../atoms/Checkbox';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { device } from '../../constants/theme';

interface Props {
    handleOnClick: () => void;
    page?: string;
    onLastPage: boolean;
    errors: any;
}
const Status = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background: white;
    height: 7rem;
    @media ${device.m} {
        height: 10rem;
        width: 80%;
        padding: 0 15rem;
        justify-content: space-between;
    }
    border-top: 2px solid ${({ theme }) => theme.colors.light.flash};
    bottom: 0;
    right: 0;
    position: fixed;
    width: 100%;
    z-index: 1;
`;
const Progress = styled.div`
    display: none;

    @media ${device.s} {
        display: flex;
        align-items: center;
    }
`;

const ButtonWrapper = styled.div`
    width: 25rem;
    @media ${device.s} {
        width: 30rem;
    }
`;

const StatusText = styled.h3`
    margin-left: 1rem;
    color: ${({ theme }) => theme.colors.primary.turquoise};
`;

export const InfoStatus = ({ handleOnClick, page, onLastPage, errors }: Props) => {
    const hasErrors = Object.keys(errors).length !== 0;
    return (
        <Status>
            <Progress>
                <Checkbox checked={!hasErrors} onChange={() => null} />
                <h3>Voortgang: </h3>
                <StatusText> {hasErrors ? 'Niet compleet' : 'Compleet'}</StatusText>
            </Progress>
            <ButtonWrapper>
                <PrimaryButton withArrow onClick={handleOnClick}>
                    {onLastPage ? 'Accommodatie opslaan' : `Opslaan en naar ${page}`}
                </PrimaryButton>
            </ButtonWrapper>
        </Status>
    );
};
