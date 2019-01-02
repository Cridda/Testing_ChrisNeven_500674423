import React, { SFC, ReactNode, Fragment } from 'react';
import ContentBlock from '../atoms/ContentBlock';
import styled from 'styled-components';
import PrimarySpanText from '../atoms/PrimarySpanText';
import { Field } from 'formik';
import { TextInput } from '../atoms/TextInput';
import gql from 'graphql-tag';
import { device } from '../../constants/theme';

interface Props {
    contact?: { name: string; phone: string };
    children: ReactNode;
    sectionName: string;
    name: string;
}

export const addressFragment = gql`
    fragment AddressFragment on Address {
        address
        postcode
        city
    }
`;

const LocationBlock: SFC<Props> = ({ children, sectionName, contact, name }) => {
    return (
        <ContentBlock>
            <h2>{sectionName}</h2>
            <p>{children}</p>
            {contact && (
                <Fragment>
                    <h4>
                        Naam <PrimarySpanText>(van contactpersoon)</PrimarySpanText>
                    </h4>
                    <Field name="contactPerson" type="text" component={TextInput} />
                </Fragment>
            )}
            <h4>Adres</h4>
            <Field name={`${name}.address`} type="text" component={TextInput} />
            <h4>Postcode / Plaats</h4>
            <ZipCityWrapper>
                <Field name={`${name}.postcode`} type="text" component={TextInput} />
                <Field name={`${name}.city`} type="text" component={TextInput} />
            </ZipCityWrapper>
        </ContentBlock>
    );
};

export default LocationBlock;

const ZipCityWrapper = styled.div`
    display: grid;
    @media ${device.xs} {
        grid-template-columns: 0.5fr 1.5fr;
    }
    column-gap: 1rem;
`;
