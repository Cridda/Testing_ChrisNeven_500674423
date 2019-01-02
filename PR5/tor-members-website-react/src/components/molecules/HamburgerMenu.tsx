import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import SecondaryButton from '../atoms/SecondaryButton';
import OutsideClickHandler from 'react-outside-click-handler';
import { withRouter, RouteComponentProps } from 'react-router';
import { Route } from '../../constants/routes';
import SideMenu from '../organisms/info/SideMenu';
import { Divider } from '../atoms/Divider';
import { device } from '../../constants/theme';

interface Props extends RouteComponentProps {
    route: Route;
}
const HamburgerMenu: React.FunctionComponent<Props> = ({ route }) => {
    const [isOpen, setIsOpen] = useState(false);
    const infoRoute = route.routes && route.routes.find(r => r.name === 'Gegevens');
    return (
        <React.Fragment>
            <Container onClick={() => setIsOpen(!isOpen)}>
                <svg version="1.1" viewBox="0 0 25 25" width="25px" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px">
                    <rect y="5" fill="#FFF" width="28" height="3" />
                    <rect y="12" fill="#FFF" width="28" height="3" />
                    <rect y="19" fill="#FFF" width="28" height="3" />
                </svg>
            </Container>
            <OutsideClickHandler onOutsideClick={() => isOpen && setIsOpen(!isOpen)}>
                <Menu isOpen={isOpen}>
                    <SecondaryButton onClick={() => setIsOpen(!isOpen)}>Sluiten</SecondaryButton>
                    <Divider small />
                    <InfoMenuItems>
                        {infoRoute && infoRoute.routes && (
                            <SideMenu
                                hamburgerOpen={() => setIsOpen(!open)}
                                inHamburger
                                routes={infoRoute.routes}
                                handlePageIndex={() => null}
                            />
                        )}
                    </InfoMenuItems>
                </Menu>
            </OutsideClickHandler>
        </React.Fragment>
    );
};

export default withRouter(HamburgerMenu);
const InfoMenuItems = styled.div`
    @media ${device.m} {
        display: none;
    }
`;
const Container = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    min-width: 8rem;
    padding-left: 2rem;
    position: relative;
`;

const Menu = styled.div<{ isOpen: boolean }>`
    padding: 1.5rem 1rem 3rem 3rem;
    z-index: 2;
    height: 100vh;
    @media ${device.s} {
        width: 50rem;
    }
    width: 30rem;
    background-color: ${({ theme }) => theme.colors.light.snow};
    position: absolute;
    border-right: 1px solid ${({ theme }) => theme.colors.light.flash};
    left: -50rem;
    ${({ isOpen }) => (isOpen ? 'transform: translateX(50rem)' : '')};
    transition: all 0.5s;
`;
