import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
// import ToggleSVG from './ToggleSVG';
// import { PicToggleButton } from './PicToggleButton';
import { Img } from 'react-image-loading';
import Checkbox from './Checkbox';

interface Props {
    first: boolean;
    src: string;
}

const Container = styled.div<{ src?: string; hover: boolean; isDragging?: boolean; checked: boolean }>`
    position: relative;
    height: 25rem;
    background-image: url(${({ src }) => src});
    background-size: cover;
    cursor: grab;
    list-style-type: none;
    float: left;
    width: 100%;
    // * On safari and firefox it selects the other pics when dragging
    user-select: none;
    border-radius: 5%;
    border: ${({ checked }) => (checked ? '3px solid' : 'none')};
    border-color: ${({ theme }) => theme.colors.primary.turquoise};
    &.dragging-helper-class {
        box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.5);
    }
`;

const Highlighted = styled.div`
    text-transform: uppercase;
    font-size: 0.8em;
    color: white;
    font-weight: 800;
    opacity: 0.7;
    background: black;
    position: absolute;
    right: 1rem;
    border-radius: 20px;
    padding: 0 1rem 0 1rem;
    top: 1rem;
`;

export const GalleryPhoto = ({ src, first }: Props) => {
    const [hover, setHover] = useState(false);
    const [checked, setChecked] = useState(false);
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    return (
        <Container
            checked={checked}
            hover={hover}
            onMouseLeave={() => setHover(!hover)}
            onMouseEnter={() => setHover(!hover)}
        >
            {/* pointerEvents set to none because otherwise it'll glitch when dragging in firefox */}
            <Img
                style={{ pointerEvents: 'none', borderRadius: '4%', objectFit: 'cover' }}
                width={'100%'}
                src={src}
                height={'100%'}
            />
            <Checkbox absolute checked={checked} onChange={handleCheckboxChange} />
            {first && <Highlighted>Uitgelicht</Highlighted>}
        </Container>
    );
};
