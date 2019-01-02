import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { MeQuery, MeQuery_me } from '../entities/schemaTypes';

export const ME_QUERY = gql`
    query MeQuery {
        me {
            id
            email
            firstName
            lastName
        }
    }
`;

const Dashboard: React.SFC<RouteComponentProps> = props => {
    return (
        <Query<MeQuery, MeQuery_me> fetchPolicy={'no-cache'} query={ME_QUERY}>
            {({ data, loading }) => {
                if (loading) {
                    return null;
                }
                if (!data) {
                    props.history.push('/login');
                    return null;
                }
                if (!data.me) {
                    return 'No users';
                }
                const { email, firstName, lastName } = data.me;
                return <div>Jij bent {`${firstName} ${lastName} en je bent ingelogd met ${email}`}</div>;
            }}
        </Query>
    );
};

export default Dashboard;
