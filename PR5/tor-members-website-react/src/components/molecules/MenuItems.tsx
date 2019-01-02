import React, { SFC } from 'react';
import styled from 'styled-components';
import { Route } from '../../constants/routes';
import MenuItem from '../atoms/MenuItem';
import { withRouter, RouteComponentProps } from 'react-router';
import { device } from '../../constants/theme';

interface Props extends RouteComponentProps {
    route: Route;
}

const MenuItems: SFC<Props> = ({ route }) => {
    return (
        <Container>
            {route.routes &&
                route.routes.map(
                    child =>
                        child.displayInNav &&
                        child.path && (
                            <MenuItem to={child.path} key={child.path}>
                                {child.name}
                            </MenuItem>
                        )
                )}
        </Container>
    );
};

const Container = styled.div`
    margin: 0 1rem;
    padding: 0;
    display: none;

    @media ${device.l} {
        display: flex;
    }
`;
export default withRouter(MenuItems);
