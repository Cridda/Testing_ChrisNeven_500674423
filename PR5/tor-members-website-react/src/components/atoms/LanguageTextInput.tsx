import React, { Fragment } from 'react';
import styled from 'styled-components';
import { FieldProps } from 'formik';
import { Error } from './Error';

interface Props extends FieldProps<any> {
    value: string;
    big?: boolean;
    placeholder?: string;
    name?: string;
    type?: string;
}

const StyledInput = styled.input`
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    background-color: ${({ theme }) => theme.colors.light.snow};
    width: 100%;
`;

const StyledTextArea = styled.textarea`
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    background-color: ${({ theme }) => theme.colors.light.snow};
    width: 100%;
    resize: vertical;
`;

export const LanguageTextInput = ({ field, form: { errors, touched }, big, ...props }: Props) => {
    return big ? (
        <Fragment>
            <StyledTextArea autoComplete="off" {...field} {...props} />
            {errors[field.name] && touched[field.name] && <Error>{errors[field.name]}</Error>}
        </Fragment>
    ) : (
        <Fragment>
            <StyledInput autoComplete="off" {...field} {...props} />
            {errors[field.name] && touched[field.name] && <Error>{errors[field.name]}</Error>}
        </Fragment>
    );
};
