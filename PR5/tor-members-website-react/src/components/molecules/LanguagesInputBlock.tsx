import * as React from 'react';
import styled from 'styled-components';
import { LanguageTextInput } from '../atoms/LanguageTextInput';
import { Field } from 'formik';
import gql from 'graphql-tag';

interface Props {
    big?: boolean;
    name: string;
    errors?: any;
}

export const languagesFragment = gql`
    fragment LanguagesFragment on TranslatableString {
        nl
        en
        de
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const LanguageWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    background-color: ${({ theme }) => theme.colors.light.snow};
    border: 1px solid ${({ theme }) => theme.colors.light.flash};

    padding: 1rem 2rem;
`;

const Language = styled.div`
    color: ${({ theme }) => theme.colors.dark.silver};
    padding-right: 1.5rem;
`;

export const LanguagesInputBlock = ({ errors, name, big = false }: Props) => (
    <Container>
        <LanguageWrapper>
            <Language>NL</Language>
            <Field big={big} name={`${name}.nl`} component={LanguageTextInput} />
        </LanguageWrapper>
        <LanguageWrapper>
            <Language>EN</Language>
            <Field big={big} name={`${name}.en`} component={LanguageTextInput} />
        </LanguageWrapper>
        <LanguageWrapper>
            <Language>DE</Language>
            <Field big={big} name={`${name}.de`} component={LanguageTextInput} />
        </LanguageWrapper>
    </Container>
);
