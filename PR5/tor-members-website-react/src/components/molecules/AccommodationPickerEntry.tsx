import React, { SFC } from 'react';
import styled from 'styled-components';
import ToggleButton from '../atoms/ToggleButton';
import { NavLink } from 'react-router-dom';
import { Location } from 'history';
import { AccommodationsQuery_accommodations } from '../../entities/schemaTypes';

interface Props {
    entry: AccommodationsQuery_accommodations;
    first: boolean;
    opened: boolean;
    location: Location;
    setOpened: (newState: boolean) => void;
    onlyOneEntry: boolean;
}

const AccommodationPickerEntry: SFC<Props> = ({ onlyOneEntry, entry, first, setOpened, opened, location }) => {
    const { name, photos, code, id } = entry;
    return (
        <Container first={first} opened={opened}>
            <Link
                exact
                onClick={() => setOpened(false)}
                to={`/accommodation/${id}`}
                opened={opened ? 1 : 0} // hopefully temporary solution for being attached to the DOM node: https://github.com/styled-components/styled-components/issues/1198
            >
                <Thumbnail src={photos[0].url} />
                <Description>
                    <Title>
                        {name.length > 40
                            ? name
                                  .substring(0, 35)
                                  .trim()
                                  .concat('...')
                            : name}
                    </Title>
                    <Code>{code}</Code>
                </Description>
            </Link>
            {first && !onlyOneEntry && (
                <ToggleButton fill={opened ? '#000' : '#FFF'} handleOnToggle={() => setOpened(!opened)} />
            )}
        </Container>
    );
};

export default AccommodationPickerEntry;

const Container = styled.div<{ opened: boolean; first: boolean }>`
    color: ${({ opened }) => (opened ? 'black' : 'white')};
    display: flex;
    align-items: center;
    height: 7.2rem;
    background-color: ${({ opened }) => opened && 'white'};
    border-bottom: ${({ opened }) => opened && '1px solid #F2F2F2'};
`;
const Link = styled(NavLink)<{ opened: number }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 7.2rem;
    width: 100%;

    &:after {
        content: '';
        position: absolute;
        top: ${({ opened }) => (opened ? '0' : 'auto')};
        left: ${({ opened }) => (opened ? '-1px' : '0')};
        right: ${({ opened }) => (opened ? 'auto' : '0')};
        width: ${({ opened }) => (opened ? '.4rem' : 'auto')};
        height: ${({ opened }) => (opened ? '7.2rem' : '.4rem')};
        bottom: 0;
        background-color: ${({ theme }) => theme.colors.primary.turquoise};
        opacity: 0;
        pointer-events: none;
        z-index: 1;
        transition: 0.25s opacity;
    }

    &.active {
        &:after {
            opacity: 1;
        }
    }

    &:hover {
        background-color: ${({ opened, theme }) => opened && theme.colors.light.flash};
    }
`;
const Thumbnail = styled.img`
    margin-left: 1rem;
    width: 7.2rem;
    height: 4.5rem;
    object-fit: cover;
    border-radius: 4px;
`;

const Description = styled.div`
    display: flex;
    height: 4.5rem;
    width: 25rem;
    flex-direction: column;
    justify-self: center;
    margin: 0rem 1rem;
`;
const Title = styled.div`
    font-weight: 500;
    line-height: 1.1em;
    width: 20rem;
`;

const Code = styled.div`
    color: ${({ theme }) => theme.colors.dark.silver};
    font-size: 0.8em;
`;
