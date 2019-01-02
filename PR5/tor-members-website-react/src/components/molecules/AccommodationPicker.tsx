import React, { useState, SFC } from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import AccommodationPickerEntry from './AccommodationPickerEntry';
import OutsideClickHandler from 'react-outside-click-handler';
import { AccommodationsQuery, AccommodationsQuery_accommodations } from '../../entities/schemaTypes';
import { device } from '../../constants/theme';

const ACCOMMODATIONS_QUERY = gql`
    query AccommodationsQuery {
        accommodations {
            id
            name
            code
            photos {
                url
            }
        }
    }
`;

const AccommodationPicker: SFC<RouteComponentProps> = ({ match, location }) => {
    const [opened, setOpened] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    // @ts-ignore
    const { accommodationId } = match.params;
    const AccommodationPickerEntries = () => (
        <Query<AccommodationsQuery> query={ACCOMMODATIONS_QUERY}>
            {({ loading, error, data }) => {
                if (loading) {
                    return <p>Loading!</p>;
                }
                if (error || !data) {
                    return <p>Something terribly went wrong!</p>;
                }
                if (data.accommodations.length === 0) {
                    return <button>Nieuwe accommdatie aanmaken</button>;
                }
                const selectedAccommodation = data.accommodations.find(
                    accommodation => accommodation.id === accommodationId
                );
                let entries: AccommodationsQuery_accommodations[] = data.accommodations.filter(
                    accommodation => accommodation.id !== accommodationId
                );
                if (selectedAccommodation) {
                    entries = [selectedAccommodation, ...entries];
                }
                return entries.map((entry, index: number) => {
                    return (
                        <AccommodationPickerEntry
                            location={location}
                            opened={opened}
                            setOpened={setOpened}
                            first={index === 0}
                            key={entry.id}
                            entry={entry}
                            onlyOneEntry={entries.length === 1}
                        />
                    );
                });
            }}
        </Query>
    );
    return (
        <Wrapper opened={opened} isAnimating={isAnimating}>
            <OutsideClickHandler onOutsideClick={() => opened && setOpened(!opened)}>
                <Container onTransitionEnd={() => setIsAnimating(true)} opened={opened}>
                    <AccommodationPickerEntries />
                </Container>
            </OutsideClickHandler>
        </Wrapper>
    );
};

export default withRouter(AccommodationPicker);

const Wrapper = styled.div<{ opened: boolean; isAnimating: boolean }>`
    height: 7.2rem;
    overflow: ${({ opened, isAnimating }) => (opened ? 'inherit' : 'hidden')};
    position: relative;
    display: none;
    z-index: 1;
    @media ${device.s} {
        display: initial;
    }
`;

// temp workaround for height because somehow it doesn't automatically scale...
const Container = styled.div<{ opened: boolean }>`
    box-shadow: ${({ opened }) => (opened ? '0 0 40px 0 rgba(0, 0, 0, 0.1)' : 'none')};
    border-radius: ${({ opened }) => (opened ? '0 0 4px 4px' : '0')};
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    height: auto;
    transition: all 0.25s;
    overflow: hidden;
`;
