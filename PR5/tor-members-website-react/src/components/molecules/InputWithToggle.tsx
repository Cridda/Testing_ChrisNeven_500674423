import styled from 'styled-components';
import React, { FunctionComponent } from 'react';
import ToggleButton from '../atoms/ToggleButton';
import { FieldProps } from 'formik';

interface Props extends FieldProps {
    options?: any[];
    optionValues: any[];
    value?: string | number;
    small?: boolean;
}

const InputWithToggle: FunctionComponent<Props> = ({ small, options = [], optionValues, field, form }) => {
    return (
        <Container small={small}>
            <Select {...field} {...form}>
                {options.map((option, index) => {
                    return (
                        <Option value={optionValues ? optionValues[index] : option} key={option}>
                            {option}
                        </Option>
                    );
                })}
            </Select>
            <ToggleButton fill={'#0a1923'} handleOnToggle={() => alert('hey')} />
        </Container>
    );
};

export default InputWithToggle;

const Option = styled.option`
    display: flex;
    align-items: center;
    height: 100%;
`;
const Container = styled.div<{ small?: boolean }>`
    position: relative;
    border: 1px solid ${({ theme }) => theme.colors.light.flash};
    background-color: ${({ theme }) => theme.colors.light.snow};
    width: ${({ small }) => (small ? '10rem' : '100%')};
    height: 4.5rem;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    padding-left: 1rem;
`;
const Select = styled.select`
    background-color: ${({ theme }) => theme.colors.light.snow};
    position: relative;
    width: 90%;
    height: 100%;
    appearance: none;
    font-size: inherit;
    padding: 1rem;
    border: 0;
    border-radius: 0%;
    outline: none;
`;
