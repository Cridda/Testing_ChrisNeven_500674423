import React, { Fragment, Component } from 'react';
import {
    SelectedAccommodationQuery_accommodation,
    SitesQuery,
    FeaturesQuery,
    SelectedAccommodationQuery_accommodation_bedrooms,
    CreateBedroom,
    CreateBedroomVariables,
    BedroomTypesQuery,
    BedroomInput
} from '../../../entities/schemaTypes';
import ContentHeader from '../../molecules/ContentHeader';
import { Divider } from '../../atoms/Divider';
import ContentBlock from '../../atoms/ContentBlock';
import SecondaryButton from '../../atoms/SecondaryButton';
import styled from 'styled-components';
import Checkbox from '../../atoms/Checkbox';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Modal from 'react-responsive-modal';
import { Field, Formik, Form } from 'formik';
import InputWithToggle from '../../molecules/InputWithToggle';
import { LanguagesInputBlock } from '../../molecules/LanguagesInputBlock';
import { PrimaryButton } from '../../atoms/PrimaryButton';
import { DoubleBedSVG } from '../../atoms/DoubleBedSVG';
import { SingleBedSVG } from '../../atoms/SingleBedSVG';
import { device } from '../../../constants/theme';
import BathroomModal from '../../molecules/bathroom/BathroomModal';

interface Props {
    accommodation: SelectedAccommodationQuery_accommodation;
}
export const bedroomFragment = gql`
    fragment BedroomFragment on Bedroom {
        id
        singleBed
        doubleBed
        type {
            name
        }
        name {
            nl
            en
            de
        }
    }
`;

export const bathroomFragment = gql`
    fragment BathroomFragment on Bathroom {
        id
        toilet
        bath
        shower
        type {
            name
        }
        name {
            nl
            en
            de
        }
    }
`;

export const facilitiesFragment = gql`
    fragment FacilitiesFragment on Accommodation {
        bathrooms {
            ...BathroomFragment
        }
        bedrooms {
            ...BedroomFragment
        }
        sites {
            name
        }
        features {
            name
        }
    }
    ${bedroomFragment}
    ${bathroomFragment}
`;

const SITES_QUERY = gql`
    query SitesQuery {
        sites {
            id
            name
        }
    }
`;

const FEATURES_QUERY = gql`
    query FeaturesQuery {
        features {
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

const CREATE_BEDROOM = gql`
    mutation CreateBedroom($accommodationId: ID!, $bedroom: BedroomInput!) {
        createBedroom(accommodationId: $accommodationId, bedroom: $bedroom) {
            ...BedroomFragment
        }
    }
    ${bedroomFragment}
`;

// const CREATE_BATHROOM = gql`
//     mutation CreateBathroom($accommodationId: ID!, $bathroom: BathroomInput!) {
//         createBathroom(accommodationId: $accommodationId, bathroom: $bathroom) {
//             ...BathroomFragment
//         }
//     }
//     ${bathroomFragment}
// `;
// const bedroomSchema = Yup.object().shape({
//     name: Yup.object({ nl: Yup.string().required('Is verplicht goos') }),
//     singleBed: Yup.number().required('Is verplicht'),
//     doubleBed: Yup.number().required('Is verplicht')
// });

const OptionsBlock = styled.div`
    display: grid;
    @media ${device.xs} {
        grid-template-columns: 0.5fr 0.5fr;
    }
    @media ${device.s} {
        grid-template-columns: 0.333fr 0.333fr 0.333fr;
    }
    @media ${device.l} {
        grid-template-columns: 0.25fr 0.25fr 0.25fr 0.25fr;
    }
`;

const Bedroom = styled.div`
    padding: 2rem;
    background: ${({ theme }) => theme.colors.light.flash};
    display: flex;
    flex-direction: column;
    height: 15rem;
    cursor: pointer;
    p {
        margin: 0;
    }
    h4 {
        padding-top: 0.5rem;
        line-height: 1.2em;
    }
`;

const BedroomContainer = styled.div`
    padding: 0rem 1.5rem;
    display: grid;
    grid-template-columns: 1fr;
    @media ${device.xs} {
        grid-template-columns: 0.333fr 0.333fr;
    }
    @media ${device.s} {
        grid-template-columns: 0.333fr 0.333fr 0.333fr;
    }
    @media ${device.l} {
        grid-template-columns: 0.25fr 0.25fr 0.25fr 0.25fr;
    }
    @media ${device.xl} {
        grid-template-columns: 0.2fr 0.2fr 0.2fr 0.2fr 0.2fr;
    }
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
`;

const Beds = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

interface State {
    open: boolean;
    bedrooms: SelectedAccommodationQuery_accommodation_bedrooms[];
}
export class InfoFacilities extends Component<Props, State> {
    state = {
        open: false,
        bedrooms: [] as SelectedAccommodationQuery_accommodation_bedrooms[]
    };
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    addToBedrooms = (bedroom: SelectedAccommodationQuery_accommodation_bedrooms) => {
        const { bedrooms } = this.state;
        bedrooms.push(bedroom);
        this.setState({ bedrooms });
    };

    componentDidMount = () => {
        const { accommodation } = this.props;
        if (accommodation.bedrooms) {
            this.setState({ bedrooms: accommodation.bedrooms });
        }
    };

    render() {
        const { accommodation } = this.props;
        const { open, bedrooms } = this.state;
        return (
            <Fragment>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <div style={{ padding: '2rem 5rem 3rem 5rem' }}>
                        <h1>Slaapkamer toevoegen</h1>
                        <Divider />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolores incidunt ipsa, earum
                            nobis beatae facilis, dolore harum vitae nihil molestias repudiandae non quisquam ab. Omnis
                            unde atque voluptate ipsa!
                        </p>
                        <Mutation<CreateBedroom, CreateBedroomVariables> mutation={CREATE_BEDROOM}>
                            {createBedroom => (
                                <Formik<BedroomInput>
                                    initialValues={{
                                        name: { en: '', nl: '', de: '' },
                                        singleBed: 0,
                                        doubleBed: 0,
                                        type: { id: '' }
                                    }}
                                    onSubmit={async bedroom => {
                                        // Why tf do I need to do this ugly af workaround
                                        bedroom.doubleBed = Number(bedroom.doubleBed);
                                        bedroom.singleBed = Number(bedroom.singleBed);
                                        // bedrooms.push({ id: 'test', name: variables.name });
                                        // this.setState({ bedrooms });
                                        const response = await createBedroom({
                                            variables: { accommodationId: accommodation.id, bedroom }
                                        });
                                        if (response && response.data && response.data.createBedroom) {
                                            this.setState({ bedrooms: response.data.createBedroom });
                                        }
                                    }}
                                >
                                    {({ submitForm, resetForm, errors }) => (
                                        <Form>
                                            <h2>Faciliteiten </h2>
                                            <ContentBlock>
                                                <h4>Type slaapkamer</h4>

                                                <Query<BedroomTypesQuery> query={BEDROOMTYPES_QUERY}>
                                                    {({ data, error, loading }) => {
                                                        if (loading || error || !data) {
                                                            return null;
                                                        }
                                                        const options: string[] = [];
                                                        const optionValues: string[] = [];
                                                        data.bedroomTypes.forEach(bedroom => {
                                                            options.push(bedroom.name);
                                                            optionValues.push(bedroom.id);
                                                        });
                                                        return (
                                                            <Field
                                                                name="type.id"
                                                                options={options}
                                                                optionValues={optionValues}
                                                                component={InputWithToggle}
                                                            />
                                                        );
                                                    }}
                                                </Query>
                                            </ContentBlock>
                                            <ContentBlock>
                                                <h4>Naam</h4>
                                                <LanguagesInputBlock errors={errors} name="name" />
                                            </ContentBlock>

                                            <ContentBlock>
                                                <h4>Eenpersoonsbed</h4>
                                                <Field
                                                    type="number"
                                                    name="singleBed"
                                                    options={[0, 1, 2, 3, 4, 5]}
                                                    component={InputWithToggle}
                                                />
                                                <h4>Tweepersoonsbed</h4>
                                                <Field
                                                    type="number"
                                                    name="doubleBed"
                                                    options={[0, 1, 2, 3, 4, 5]}
                                                    component={InputWithToggle}
                                                />
                                            </ContentBlock>
                                            <Divider />

                                            <PrimaryButton
                                                onClick={() => {
                                                    submitForm();
                                                    resetForm();
                                                    this.onCloseModal();
                                                }}
                                            >
                                                Slaapkamer toevoegen
                                            </PrimaryButton>
                                        </Form>
                                    )}
                                </Formik>
                            )}
                        </Mutation>
                    </div>
                </Modal>
                <ContentHeader>
                    <h1>Faciliteiten van het {accommodation.type.name}</h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quia reprehenderit minima nisi
                    voluptates.
                </ContentHeader>
                <Divider />
                <ContentBlock threeColumns>
                    <h2>Slaapkamers</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam praesentium enim modi fugiat
                        voluptatem, atque quod eveniet mollitia quas deleniti.
                    </p>
                    <SecondaryButton onClick={() => this.onOpenModal()} type="button">
                        Slaapkamer toevoegen
                    </SecondaryButton>
                </ContentBlock>
                <BedroomContainer>
                    {bedrooms &&
                        bedrooms.map((bedroom, index) => {
                            const { doubleBed, singleBed } = bedroom;
                            return (
                                <Bedroom onClick={() => this.onOpenModal()} key={'bedroom'.concat(String(index))}>
                                    <Beds>
                                        {[...Array(bedroom.doubleBed)].map((_, i) => (
                                            <DoubleBedSVG key={'double'.concat(String(i))} />
                                        ))}
                                        {[...Array(bedroom.singleBed)].map((_, i) => (
                                            <SingleBedSVG key={'single'.concat(String(i))} />
                                        ))}
                                    </Beds>
                                    <h4>{bedroom.type.name}</h4>
                                    {doubleBed > 0 && <p>{`${doubleBed} tweepersoonsbed`}</p>}
                                    {singleBed > 0 && <p>{`${singleBed} eenpersoonsbed`}</p>}
                                </Bedroom>
                            );
                        })}
                </BedroomContainer>
                <Divider />
                <ContentBlock threeColumns>
                    <h2>Badkamers</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam praesentium enim modi fugiat
                        voluptatem, atque quod eveniet mollitia quas deleniti.
                    </p>
                    <BathroomModal edit />
                </ContentBlock>

                <Divider />
                <ContentBlock>
                    <h2>Ligging</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quia maiores, deleniti
                        quaerat, fuga quos earum impedit id dolorum tempora quo architecto iure asperiores officiis
                        quisquam nobis atque. Voluptatem, provident.
                    </p>
                </ContentBlock>
                {/* LIGGING area */}
                <OptionsBlock>
                    <Query<SitesQuery> query={SITES_QUERY}>
                        {({ loading, data, error }) => {
                            if (loading || !data) {
                                return 'Loading...';
                            }
                            if (error) {
                                return null;
                            }
                            const { sites } = data;
                            const accommodationSites = accommodation.sites;
                            return (
                                <Fragment>
                                    {sites.map(({ id: id, name }) => {
                                        let checked: boolean = false;
                                        if (accommodationSites) {
                                            checked = !!accommodationSites.find(accSite => accSite.name === name);
                                        }
                                        return (
                                            <Checkbox key={id} checked={checked} onChange={() => ''}>
                                                {name}
                                            </Checkbox>
                                        );
                                    })}
                                </Fragment>
                            );
                        }}
                    </Query>
                </OptionsBlock>
                <Divider />
                <ContentBlock>
                    <h2>Accommodatie kenmerken</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quia maiores, deleniti
                        quaerat, fuga quos earum impedit id dolorum tempora quo architecto iure asperiores officiis
                        quisquam nobis atque. Voluptatem, provident.
                    </p>
                </ContentBlock>
                <OptionsBlock>
                    <Query<FeaturesQuery> query={FEATURES_QUERY}>
                        {({ loading, error, data }) => {
                            if (loading || !data) {
                                return 'Loading...';
                            }
                            if (error) {
                                return null;
                            }
                            const { features } = data;
                            const accommodationFeatures = accommodation.features;
                            return (
                                <Fragment>
                                    {features.map(({ id: id, name }) => {
                                        let checked: boolean = false;
                                        if (accommodationFeatures) {
                                            checked = !!accommodationFeatures.find(
                                                accFeature => accFeature.name === name
                                            );
                                        }
                                        return (
                                            <Checkbox key={id} checked={checked} onChange={() => ''}>
                                                {name}
                                            </Checkbox>
                                        );
                                    })}
                                </Fragment>
                            );
                        }}
                    </Query>
                </OptionsBlock>
            </Fragment>
        );
    }
}
