import gql from 'graphql-tag';
import * as React from 'react';
import InputWithToggle from '../InputWithToggle';
import { Field } from 'formik';
import { Query } from 'react-apollo';
import { BathroomTypesQuery, BedroomTypesQuery } from '../../../entities/schemaTypes';

const BATHROOMTYPES_QUERY = gql`
    query BathroomTypesQuery {
        bathroomTypes {
            id
            name
        }
    }
`;

const BEDROOMTYPES_QUERY = gql`
    query BedroomTypesQuery {
        bedroomTypes {
            id
            name
        }
    }
`;

export const BathroomInputTypes = () => {
    return (
        <Query<BathroomTypesQuery> query={BATHROOMTYPES_QUERY}>
            {({ data, loading, error }) => {
                if (loading || error || !data) {
                    return null;
                }
                const options: string[] = [];
                const optionValues: string[] = [];
                data.bathroomTypes.forEach(type => {
                    options.push(type.name);
                    optionValues.push(type.id);
                });
                return (
                    <Field name="type.id" options={options} optionValues={optionValues} component={InputWithToggle} />
                );
            }}
        </Query>
    );
};

export const BedroomInputTypes = () => {
    return (
        <Query<BedroomTypesQuery> query={BEDROOMTYPES_QUERY}>
            {({ data, loading, error }) => {
                if (loading || error || !data) {
                    return null;
                }
                const options: string[] = [];
                const optionValues: string[] = [];
                data.bedroomTypes.forEach(type => {
                    options.push(type.name);
                    optionValues.push(type.id);
                });
                return (
                    <Field name="type.id" options={options} optionValues={optionValues} component={InputWithToggle} />
                );
            }}
        </Query>
    );
};
