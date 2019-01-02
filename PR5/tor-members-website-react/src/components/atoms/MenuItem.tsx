import React, { SFC, ReactNode } from 'react';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import pathToRegexp from 'path-to-regexp';

interface Props extends RouteComponentProps {
    to: string;
    children: ReactNode;
}
const MenuItem: SFC<Props> = ({ to, children, match: { params } }) => {
    const generatePath = pathToRegexp.compile(to);
    return (
        <Container>
            <Link to={generatePath(params)}>{children}</Link>
        </Container>
    );
};

const Link = styled(NavLink)`
    color: ${({ theme }) => theme.colors.light.silver};
    transition: 0.25s color;

    &:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${({ theme }) => theme.colors.primary.turquoise};
        height: 0.3rem;
        opacity: 0;
        pointer-events: none;
        z-index: 1;
        transition: 0.25s opacity;
    }
    &.active {
        color: ${({ theme }) => theme.colors.light.white};

        &:after {
            opacity: 1;
        }
    }
`;
const Container = styled.li`
    font-size: 1.4rem;
    line-height: 3.2rem;
    height: 7.2rem;
    display: flex;
    align-items: center;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.dark.silver};
    margin: 0 3rem;
    list-style: none;
    position: relative;
`;

export default withRouter(MenuItem);
