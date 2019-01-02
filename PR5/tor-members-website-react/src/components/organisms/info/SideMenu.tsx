import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import { Route } from '../../../constants/routes';
import pathToRegexp from 'path-to-regexp';
import { Divider } from '../../atoms/Divider';
import { device } from '../../../constants/theme';

interface Props extends RouteComponentProps {
    handlePageIndex: (index: number) => void;
    routes: Route[];
    inHamburger?: boolean;
    hamburgerOpen?: () => void;
}

const SideMenu: FunctionComponent<Props> = ({
    match: { params },
    handlePageIndex,
    routes,
    inHamburger,
    hamburgerOpen
}) => (
    <Menu inHamburger={inHamburger}>
        {routes.map((child, index) => {
            if (child.path && child.name !== 'NotFound') {
                const generatePath = pathToRegexp.compile(child.path);
                return (
                    child.path && (
                        <div key={child.path}>
                            <MenuLink
                                exact
                                onClick={() => {
                                    // check if menu is in the hamburger
                                    if (hamburgerOpen) {
                                        hamburgerOpen();
                                    }
                                    handlePageIndex(index);
                                }}
                                to={generatePath(params)}
                            >
                                {child.name}
                            </MenuLink>
                            <Divider small />
                        </div>
                    )
                );
            } else {
                return null;
            }
        })}
    </Menu>
);

export default withRouter(SideMenu);

const Menu = styled.div<{ inHamburger?: boolean }>`
    background: ${({ theme }) => theme.colors.light.snow};
    padding: ${({ inHamburger }) => (inHamburger ? '1.5rem' : '3rem')};
    display: flex;
    flex-direction: column;
    ${({ inHamburger }) => (inHamburger ? '' : 'display: none;')}

    @media ${device.m} {
        display: initial;
    }
`;
const MenuLink = styled(NavLink)`
    color: grey;
    font-weight: 500;
    &.active {
        color: #000;
    }
`;
