import React, { SFC } from 'react';
import styled from 'styled-components';
import Logo from '../atoms/Logo';
import MenuItems from '../molecules/MenuItems';
import { Route } from '../../constants/routes';
import AccomodationPicker from '../molecules/AccommodationPicker';
import HamburgerMenu from '../molecules/HamburgerMenu';
import { Profile } from '../molecules/Profile';

interface Props {
    route: Route;
}

const Navigation: SFC<Props> = props => {
    return (
        <Container>
            <HamburgerMenu route={props.route} />
            <Logo />
            <AccomodationPicker {...props} />
            <MenuItems route={props.route} />
            <Profile />
        </Container>
    );
};

const Container = styled.div`
    background: ${({ theme }) => theme.colors.dark.eerie};
    display: flex;
    flex-direction: row;
    /* align-items: center; */
    height: 7.2rem;
    position: relative;
    /* z-index: 1; */
`;

export default Navigation;
