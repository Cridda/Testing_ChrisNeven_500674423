import React, { FunctionComponent } from 'react';
import { PrimaryButton } from '../atoms/PrimaryButton';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { LoginMutation, LoginMutationVariables } from '../../entities/schemaTypes';
import { AnchorTag } from '../atoms/AnchorTag';
import { Divider } from '../atoms/Divider';
import Logo from '../atoms/Logo';
import { setToken, readToken } from '../../utils';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '../atoms/TextInput';

const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;

interface Values {
    email: string;
    password: string;
}

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Vul een geldig email adres in')
        .required('Email adres is verplicht'),
    password: Yup.string().required('Wachtwoord is verplicht')
});

export const Login: FunctionComponent<RouteComponentProps> = ({ history }) => {
    if (readToken()) {
        history.push('/accommodation/dashboard');
    }
    // Read token from localStorage in order to check if the user is logged in.

    return (
        <Mutation<LoginMutation, LoginMutationVariables> mutation={LOGIN_MUTATION}>
            {(mutate, { error, data }) => {
                return (
                    <Container>
                        <FormWrapper>
                            <div>
                                <Logo variant="dark" />

                                <Divider />
                                <Formik<Values>
                                    initialValues={{ email: '', password: '' }}
                                    validationSchema={LoginSchema}
                                    onSubmit={async (values: Values) => {
                                        try {
                                            const response = await mutate({
                                                variables: values
                                            });
                                            if (response && response.data) {
                                                setToken(response.data.login.token);
                                                history.push('/accommodation/dashboard');
                                            }
                                        } catch (e) {
                                            alert('Verkeerde gebruikersnaam en/of wachtwoord');
                                        }
                                    }}
                                >
                                    {({ handleSubmit }) => (
                                        <Form>
                                            <Field
                                                name="email"
                                                type="text"
                                                component={TextInput}
                                                placeholder={'Email'}
                                            />
                                            <Field
                                                name="password"
                                                type="password"
                                                component={TextInput}
                                                placeholder={'Wachtwoord'}
                                            />
                                            <PrimaryButton onClick={handleSubmit} type="button">
                                                Inloggen
                                            </PrimaryButton>
                                        </Form>
                                    )}
                                </Formik>

                                <Divider />
                                <LoginMenu>
                                    <AnchorTag to={'/register'}>account aanmaken</AnchorTag>
                                    <AnchorTag to={'/login'}>wachtwoord vergeten</AnchorTag>
                                </LoginMenu>
                            </div>
                        </FormWrapper>
                    </Container>
                );
            }}
        </Mutation>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const LoginMenu = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const FormWrapper = styled.div`
    width: 50rem;
    input {
        padding: 1rem;
        margin-bottom: 1rem;
    }
`;
