import React, { PureComponent } from 'react';
import { PrimaryButton } from '../atoms/PrimaryButton';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { RegisterMutation, RegisterMutationVariables } from '../../entities/schemaTypes';
import { Mutation } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { Divider } from '../atoms/Divider';
import Logo from '../atoms/Logo';
import { TextInput } from '../atoms/TextInput';
import { Field, Form, Formik } from 'formik';

interface StateProps {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    [key: string]: string;
}

const REGISTER_MUTATION = gql`
    mutation RegisterMutation(
        $email: String!
        $password: String!
        $firstName: String!
        $lastName: String!
        $phone: String!
        $address: AddressInput!
    ) {
        signup(
            firstName: $firstName
            lastName: $lastName
            email: $email
            password: $password
            phone: $phone
            address: $address
        ) {
            token
        }
    }
`;

interface Values {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
}

export class Register extends PureComponent<RouteComponentProps, StateProps> {
    render() {
        return (
            <Mutation<RegisterMutation, RegisterMutationVariables> mutation={REGISTER_MUTATION}>
                {mutate => (
                    <Container>
                        <FormWrapper>
                            <Logo variant="dark" />
                            <Divider />
                            <Formik<Values>
                                initialValues={{ email: '', password: '', firstName: '', lastName: '', phone: '' }}
                                onSubmit={async (values: Values) => {
                                    const response = await mutate({
                                        variables: {
                                            address: {
                                                postcode: '1095AZ',
                                                address: 'Fopolaan 9',
                                                city: 'Amsterdam'
                                            },
                                            ...values
                                        }
                                    });
                                    console.log(response);
                                    this.props.history.push('/login');
                                }}
                            >
                                {() => (
                                    <Form>
                                        <Field name="email" type="email" component={TextInput} placeholder={'Email'} />
                                        <Field
                                            name="password"
                                            type="password"
                                            component={TextInput}
                                            placeholder={'Wachtwoord'}
                                        />
                                        <Field
                                            name="firstName"
                                            type="text"
                                            component={TextInput}
                                            placeholder={'Voornaam'}
                                        />
                                        <Field
                                            name="lastname"
                                            type="text"
                                            component={TextInput}
                                            placeholder={'Achternaam'}
                                        />
                                        <Field name="phone" type="tel" component={TextInput} placeholder={'Telefoon'} />
                                        <PrimaryButton type="submit">Registreren</PrimaryButton>
                                    </Form>
                                )}
                            </Formik>
                        </FormWrapper>
                    </Container>
                )}
            </Mutation>
        );
    }
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const FormWrapper = styled.div`
    width: 50rem;
    input {
        padding: 1rem;
        margin-bottom: 1rem;
    }
`;
