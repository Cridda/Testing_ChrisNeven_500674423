import React, { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
    type?: string;
    onClick?: () => void;
    children: ReactNode;
    errors?: any;
    withArrow?: boolean;
}
const StyledButton = styled.button<{ withArrow?: boolean }>`
    font-weight: 500;
    font-size: 1em;
    width: 100%;
    color: white;
    background-color: ${({ theme }) => theme.colors.primary.turquoise};
    padding: 1.4rem 2rem;
    border: none;
    outline: none;
    display: flex;
    font-style: inherit;

    justify-content: ${({ withArrow }) => (withArrow ? 'space-between' : 'center')};
    align-items: center;

    :disabled {
        background-color: grey;
    }
`;

export const PrimaryButton: FunctionComponent<Props> = ({ type, children, onClick, errors, withArrow }) => {
    return (
        <StyledButton
            withArrow={withArrow}
            disabled={errors && Object.keys(errors).length !== 0}
            onClick={onClick}
            type={type || 'button'}
        >
            {children}
            {withArrow && (
                <svg
                    width="24"
                    fill="#FFF"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                >
                    <path
                        stroke="white"
                        strokeWidth="0.8"
                        d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"
                    />
                </svg>
            )}
        </StyledButton>
    );
};
