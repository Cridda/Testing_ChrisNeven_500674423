import * as React from 'react';
import styled from 'styled-components';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export default (props: Props) => (
    <ContentHeader>
        <Text>{props.children}</Text>
    </ContentHeader>
);

const ContentHeader = styled.div``;

const Text = styled.div`
    width: 100%;
`;
