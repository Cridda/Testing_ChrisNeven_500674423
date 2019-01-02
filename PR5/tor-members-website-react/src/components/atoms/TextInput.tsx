import * as React from 'react';
import styled from 'styled-components';
import { FieldProps } from 'formik';
import { Error } from './Error';

interface Props extends FieldProps<any> {
    placeholder?: string;
    small?: boolean;
    right?: boolean;
    children?: React.ReactNode;
}
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
const StyledInput = styled.input<{ small?: boolean; right?: boolean; error: boolean }>`
    font-size: inherit;
    font-style: inherit;
    border: 1px solid ${({ theme, error }) => (error ? 'red' : theme.colors.light.flash)};
    background-color: ${({ theme }) => theme.colors.light.snow};
    width: ${({ small }) => (small ? '10rem' : '100%')};
    padding: 1.5rem 2rem;
    outline: none;
    direction: ${({ right }) => (right ? 'rtl' : '')};
`;
const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;
export const TextInput = ({ field, form: { touched, errors }, children, ...props }: Props) => (
    <Container>
        <InputWrapper>
            <StyledInput error={!!(errors[field.name] && touched[field.name])} type="text" {...field} {...props} />
            {children && <p style={{ marginLeft: '1rem' }}> {children}</p>}
        </InputWrapper>
        {errors[field.name] && touched[field.name] && <Error>{errors[field.name]}</Error>}
    </Container>
);
