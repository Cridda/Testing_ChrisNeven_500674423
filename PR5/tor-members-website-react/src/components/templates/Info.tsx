import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import {
    SelectedAccommodationQuery,
    SelectedAccommodationQuery_accommodation,
    UpdateAccommodationVariables
} from '../../entities/schemaTypes';
import { Route } from '../../constants/routes';
import { renderRoutes } from 'react-router-config';
import pathToRegexp from 'path-to-regexp';
import { InfoStatus } from '../molecules/InfoStatus';
import { detailsFragment } from '../organisms/info/InfoDetails';
import { photoFragment } from '../organisms/info/InfoPhotos';
import { Formik, Form } from 'formik';
import { removeTypename } from '../../utils';
import SideMenu from '../organisms/info/SideMenu';
import * as Yup from 'yup';
import { facilitiesFragment } from '../organisms/info/InfoFacilities';
import { device } from '../../constants/theme';

const GET_SELECTED_ACCOMMODATION_QUERY = gql`
    query SelectedAccommodationQuery($id: ID!) {
        accommodation(id: $id) {
            id
            ...DetailsFragment
            photos {
                ...PhotoFragment
            }
            ...FacilitiesFragment
        }
    }
    ${detailsFragment}
    ${photoFragment}
    ${facilitiesFragment}
`;

const UPDATE_ACCOMMODATION_MUTATION = gql`
    mutation UpdateAccommodation(
        $id: String!
        $name: String
        $description: TranslatableStringInput
        $address: AddressInput
        $keyAddress: AddressInput
        $type: AccommodationTypeInput
        $livingArea: Int
        $outsideArea: Int
        $contactPhone: String
        $contactPerson: String
        $minCapacity: Int
        $maxCapacity: Int
        $city: CityInput
    ) {
        updateAccommodation(
            accommodationId: $id
            input: {
                description: $description
                name: $name
                address: $address
                keyAddress: $keyAddress
                type: $type
                livingArea: $livingArea
                outsideArea: $outsideArea
                contactPhone: $contactPhone
                contactPerson: $contactPerson
                minCapacity: $minCapacity
                maxCapacity: $maxCapacity
                city: $city
            }
        ) {
            id
            name
        }
    }
`;
interface State {
    currentPage: number;
    accommodation: SelectedAccommodationQuery_accommodation;
}

interface Props {
    route: Route;
}

const InfoSchema = Yup.object().shape({
    contactPerson: Yup.string().required()
});

class Info extends PureComponent<RouteComponentProps<{ accommodationId: string }> & Props, State> {
    state = {
        currentPage: 0,
        accommodation: {
            id: '',
            code: 0,
            description: { en: '', nl: '', de: '' },
            address: { address: '', postcode: '', city: '' },
            livingArea: 0,
            outsideArea: 0,
            minCapacity: 0,
            maxCapacity: 0,
            keyAddress: { address: '', postcode: '', city: '' },
            type: { name: '' },
            contactPhone: '',
            contactPerson: '',
            photos: [],
            bathrooms: [],
            bedrooms: [],
            sites: [],
            features: []
        }
    };

    handleNextPage = () => {
        const {
            route: { routes },
            history,
            match: { params }
        } = this.props;
        if (routes) {
            const nextPage = this.state.currentPage + 1;
            const { path } = routes[nextPage];
            if (path) {
                const generatePath = pathToRegexp.compile(path);
                history.push(generatePath(params));
            }
            if (nextPage <= routes.length) {
                this.setState(state => ({ currentPage: state.currentPage + 1 }));
            }
        }
    };
    handlePageIndex = (index: number) => this.setState(state => ({ currentPage: index }));
    render() {
        const {
            route,
            match: {
                params: { accommodationId }
            }
        } = this.props;
        return (
            <Container>
                {route.routes && <SideMenu routes={route.routes} handlePageIndex={this.handlePageIndex} />}
                <Query<SelectedAccommodationQuery>
                    variables={{ id: accommodationId }}
                    query={GET_SELECTED_ACCOMMODATION_QUERY}
                >
                    {({ loading, error, data }) => {
                        if (loading) {
                            return <p>Loading...</p>;
                        }
                        if (error || !data) {
                            if (error) {
                                console.log(error);
                            }
                            return <p>Error!!</p>;
                        }
                        const { accommodation } = data;
                        let values: UpdateAccommodationVariables;
                        if (!accommodation) {
                            // If the user has no accommodation initial values should be set to empty/standard ones.
                            values = {
                                ...this.state.accommodation
                            };
                        } else {
                            values = { ...removeTypename(accommodation) };
                        }

                        return (
                            <Wrapper>
                                <Mutation mutation={UPDATE_ACCOMMODATION_MUTATION}>
                                    {mutate => (
                                        <Formik<UpdateAccommodationVariables>
                                            initialValues={values}
                                            onSubmit={async (variables, { setSubmitting }) => {
                                                variables.maxCapacity = Number(variables.maxCapacity);
                                                variables.minCapacity = Number(variables.minCapacity);
                                                await mutate({ variables });
                                                setSubmitting(false);
                                            }}
                                            validationSchema={InfoSchema}
                                        >
                                            {({ submitForm, errors, isSubmitting }) => {
                                                const routes = route.routes;
                                                const amountOfPages = routes && routes.length - 2;
                                                const { currentPage } = this.state;
                                                const isLastPage = amountOfPages === currentPage;
                                                if (isSubmitting) {
                                                    return <div>Saving....</div>;
                                                }
                                                return (
                                                    <ContentWrapper>
                                                        <Form>
                                                            <Content>
                                                                {renderRoutes(routes, {
                                                                    accommodation: accommodation
                                                                        ? accommodation
                                                                        : this.state.accommodation
                                                                })}
                                                            </Content>
                                                            <InfoStatus
                                                                errors={errors}
                                                                onLastPage={isLastPage}
                                                                page={
                                                                    routes && routes[currentPage + 1].name.toLowerCase()
                                                                }
                                                                handleOnClick={() => {
                                                                    submitForm();
                                                                    if (!isLastPage) {
                                                                        this.handleNextPage();
                                                                    }
                                                                }}
                                                            />
                                                        </Form>
                                                    </ContentWrapper>
                                                );
                                                // return <Content>{pages(accommodationData)[this.state.page]}</Content>;
                                            }}
                                        </Formik>
                                    )}
                                </Mutation>
                            </Wrapper>
                        );
                    }}
                </Query>
            </Container>
        );
    }
}

export default withRouter(Info);

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr;

    @media ${device.m} {
        grid-template-columns: 0.4fr 1.6fr;
    }
    flex-direction: row;
    height: calc(100vh - 7.2rem);
`;

const ContentWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 2rem 4rem;
    @media ${device.s} {
        padding: 3rem 5rem 0 5rem;
    }

    @media ${device.xl} {
        padding: 3rem 15rem 0 15rem;
    }
`;

const Wrapper = styled.div`
    overflow-y: scroll;
    position: relative;
`;

const Content = styled.div`
    padding-bottom: 12rem;
`;
