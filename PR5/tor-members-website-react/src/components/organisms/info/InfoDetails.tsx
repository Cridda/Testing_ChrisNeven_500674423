import React, { Fragment, PureComponent } from 'react';
import { SelectedAccommodationQuery_accommodation } from '../../../entities/schemaTypes';
import ContentHeader from '../../molecules/ContentHeader';
import { Divider } from '../../atoms/Divider';
import ContentBlock from '../../atoms/ContentBlock';
import PrimarySpanText from '../../atoms/PrimarySpanText';
import InputWithToggle from '../../molecules/InputWithToggle';
import LocationBlock, { addressFragment } from '../../molecules/LocationBlock';
import { LanguagesInputBlock, languagesFragment } from '../../molecules/LanguagesInputBlock';
import { TextInput } from '../../atoms/TextInput';
import gql from 'graphql-tag';
import { Field } from 'formik';

interface Props {
    accommodation: SelectedAccommodationQuery_accommodation;
}

export const detailsFragment = gql`
    fragment DetailsFragment on Accommodation {
        code
        description {
            ...LanguagesFragment
        }
        type {
            name
        }
        livingArea
        outsideArea
        minCapacity
        maxCapacity
        address {
            ...AddressFragment
        }
        keyAddress {
            ...AddressFragment
        }
        contactPerson
        contactPhone
    }
    ${languagesFragment}
    ${addressFragment}
`;
class InfoDetails extends PureComponent<Props> {
    render() {
        const typeOptions: string[] = ['Vakantiehuisje', 'Hotel', 'Kamperen']; // todo: Get from server
        const capacityOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        const { accommodation } = this.props;
        return (
            <Fragment>
                <ContentHeader>
                    <h1>Gegevens van het {accommodation ? accommodation.type.name : 'Vakantiehuisje'}</h1>
                    Hello afjejf Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci voluptatum iste
                    error, accusamus rem, alias omnis ducimus dolorum atque quaerat corporis, distinctio soluta
                    excepturi aut neque modi nemo. Ipsam, eos.
                </ContentHeader>
                <Divider />

                <ContentBlock>
                    <h2>Algemeen</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam praesentium enim modi fugiat
                        voluptatem, atque quod eveniet mollitia quas deleniti.
                    </p>

                    <h4>
                        Naam {accommodation.code !== 0 && <PrimarySpanText>Code: {accommodation.code}</PrimarySpanText>}
                    </h4>
                    <LanguagesInputBlock name="description" />
                    <h4>
                        Type <PrimarySpanText>Verplicht</PrimarySpanText>
                    </h4>
                    <div>
                        <Field
                            options={typeOptions}
                            name="type.name"
                            standardValue={'Selecteer type accommodatie'}
                            component={InputWithToggle}
                        />
                    </div>
                </ContentBlock>
                <Divider />
                <ContentBlock>
                    <h2>Oppervlakte</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam praesentium enim modi fugiat
                        voluptatem, atque quod eveniet mollitia quas deleniti.
                    </p>
                    <h4>Woonoppervlakte</h4>
                    <div>
                        <Field name="livingArea" type="number" component={TextInput} small>
                            m2
                        </Field>
                    </div>
                    <h4>Buitenruimte</h4>
                    <div>
                        <Field name="outsideArea" type="number" component={TextInput} small>
                            m2
                        </Field>
                    </div>
                </ContentBlock>
                <Divider />
                <ContentBlock>
                    <h2>Capacity</h2>
                    <p>
                        Maxime maiores est eveniet mollitia quas blanditiis debitis esse exercitationem odit hic
                        voluptas tempora, ipsum facilis itaque nemo iste incidunt quibusdam? Nam.
                    </p>
                    <h4>Minimaal</h4>
                    <div>
                        <Field options={capacityOptions} name="minCapacity" component={InputWithToggle} />
                    </div>
                    <h4>Maximaal</h4>
                    <div>
                        <Field options={capacityOptions} name="maxCapacity" component={InputWithToggle} />
                    </div>
                </ContentBlock>
                <Divider />
                <LocationBlock name="address" sectionName={'Locatie'}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores suscipit dicta odit repellat nisi?
                    Vitae ducimus, iure quis animi possimus veritatis.
                </LocationBlock>
                <Divider />
                <LocationBlock
                    name="keyAddress"
                    sectionName={'Sleutel locatie'}
                    contact={
                        accommodation
                            ? { name: accommodation.contactPerson, phone: accommodation.contactPhone }
                            : { name: '', phone: '' }
                    }
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, incidunt blanditiis? Asperiores
                    officia assumenda suscipit fugiat ek accusamus.
                </LocationBlock>
            </Fragment>
        );
    }
}

export default InfoDetails;
