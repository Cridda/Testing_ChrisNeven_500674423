import React, { ChangeEvent, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
    checked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    absolute?: boolean;
    children?: ReactNode;
}
const Checkbox = ({ absolute, children, ...props }: Props) => {
    return (
        <label>
            <Container absolute={absolute}>
                <HiddenCheckbox {...props} type="checkbox" />
                <StyledCheckbox checked={props.checked}>
                    <Icon viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                    </Icon>
                </StyledCheckbox>
                <Label>{children}</Label>
            </Container>
        </label>
    );
};

const Container = styled.div<{ absolute?: boolean }>`
    display: flex;
    align-content: center;
    vertical-align: middle;
    cursor: default;
    margin: 1rem;
    ${({ absolute }) => absolute && 'position: absolute; left: 0; top: 0;'}
`;

const Icon = styled.svg`
    fill: none;
    stroke: white;
    stroke-width: 2px;
`;

const Label = styled.span`
    margin-left: 1rem;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
    display: inline-block;
    width: 25px;
    height: 25px;
    background: ${({ theme, checked }) => (checked ? theme.colors.primary.turquoise : theme.colors.light.flash)};
    border-radius: 5px;
    transition: all 0.15s;

    ${HiddenCheckbox}:focus + & {
        box-shadow: 0 0 0 3px ${({ theme, checked }) => (checked ? theme.colors.primary.waterspout : theme.colors.light.lavendar)};
    }

    ${Icon} {
        visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
    }
`;

export default Checkbox;
