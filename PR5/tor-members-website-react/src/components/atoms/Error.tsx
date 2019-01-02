import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
    children: ReactNode;
}
const Container = styled.div`
    color: red;
`;

export const Error = ({ children }: Props) => <Container>{children}</Container>;
