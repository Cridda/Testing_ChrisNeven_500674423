import React, { FunctionComponent, useState } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { MeQuery, MeQuery_me } from '../../entities/schemaTypes';
import ToggleButton from '../atoms/ToggleButton';

const ME_QUERY = gql`
    query ProfileQuery {
        me {
            id
            email
            firstName
            lastName
        }
    }
`;

const Logout = styled(Link)`
    color: white;
`;

const Container = styled.div`
    position: absolute;
    width: 13rem;
    right: 3rem;
    display: flex;
    flex-direction: row;
    height: 100%;
    align-items: center;
`;

const ProfilePic = styled.div`
    background: url('https://source.unsplash.com/random?face');
    object-fit: scale-down;
    height: 4.5rem;
    border-radius: 35%;
    width: 5rem;
    margin-right: 1rem;
`;

const Dropdown = styled.div`
    position: absolute;
    background: white;
    color: black;
    width: 100%;
`;

export const Profile: FunctionComponent = () => {
    const [open, setOpen] = useState(false);
    return (
        <Query<MeQuery, MeQuery_me> query={ME_QUERY}>
            {({ loading, data, error, client }) => {
                if (loading) {
                    return null;
                }
                if (!data || error) {
                    return null;
                }
                if (!data.me) {
                    return 'Not logged in';
                }
                return (
                    <Container>
                        <ProfilePic />
                        <Logout
                            onClick={() => {
                                client.resetStore();
                                localStorage.removeItem('token');
                            }}
                            to={'/login'}
                        >
                            {data.me.firstName}
                        </Logout>
                        <ToggleButton fill={open ? '#000' : '#FFF'} handleOnToggle={() => setOpen(!open)} />
                        <Dropdown />
                    </Container>
                );
            }}
        </Query>
    );
};
