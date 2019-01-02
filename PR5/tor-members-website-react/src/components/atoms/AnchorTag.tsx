import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
    to: string;
    children: ReactNode;
}

const StyledLink = styled(Link)`
    text-decoration: underline;
    :hover {
        color: ${({ theme }) => theme.colors.primary.turquoise};
    }
`;

export const AnchorTag = ({ to, children }: Props) => {
    return <StyledLink to={to}>{children}</StyledLink>;
};
