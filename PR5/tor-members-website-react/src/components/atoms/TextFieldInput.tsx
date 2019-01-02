import styled from 'styled-components';
import { FieldProps } from 'formik';
import * as React from 'react';

const TextFieldInput: React.SFC<FieldProps<any>> = ({ field, form: { touched, errors }, ...props }) => (
    <Container>
        {errors && <Error>{touched[field.name] && errors[field.name]}</Error>}
        <StyledTextFieldInput type="text" {...field} {...props} />
    </Container>
);

export const StyledTextFieldInput = styled.input<{
    small?: boolean;
    right?: boolean;
}>`
    font-size: inherit;
    border: 1px solid ${({ theme }) => theme.colors.light.flash};
    background-color: ${({ theme }) => theme.colors.light.snow};
    width: ${({ small }) => (small ? '10rem' : '100%')};
    padding: 1.5rem 2rem;
    outline: none;
    direction: ${({ right }) => (right ? 'rtl' : '')};
`;
const Error = styled.p`
    color: red;
    margin: 0;
`;
const Container = styled.div`
    display: flex;
`;

export default TextFieldInput;
