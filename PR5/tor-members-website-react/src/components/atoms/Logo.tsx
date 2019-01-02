import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface Props extends React.SVGAttributes<SVGElement> {
    variant?: 'light' | 'dark';
    size?: 'small' | 'medium' | 'large';
}

const Container = styled.svg`
    margin: 0 5rem 0 0;
    display: flex;
    height: 100%;
    align-self: center;
`;

const Logo = ({ variant = 'light', color = 'currentColor', size = 'medium', ...rest }: Props) => (
    <Fragment>
        <Link to="/">
            <Container width="48" height="21" viewBox="0 0 48 21">
                <g fill="none" fillRule="evenodd">
                    <path
                        d="M3.44250024.8h5.4v3.6h4.19999996v4.35H8.84250024v5.1c0 .99.45 1.5 1.34999996 1.5.63 0 1.5-.12 1.95-.21l.3-.09.6 4.5c-1.2.51-2.64.75-4.34999996.75-3.24 0-5.25-1.83-5.25-4.95v-6.6h-2.7V4.4h2.7V.8zM15.9112501 18.02c-1.59-1.53-2.4-3.42-2.4-5.73 0-2.31.84-4.23 2.49-5.82 1.65-1.59 3.72-2.37 6.15-2.37s4.47.75 6.06 2.28c1.59 1.53 2.4 3.42 2.4 5.73 0 2.31-.84 4.23-2.49 5.82-1.65 1.59-3.72 2.37-6.15 2.37s-4.47-.75-6.06-2.28zm3.9-8.07c-1.2 1.23-1.2 3.27 0 4.47.6.63 1.35.93 2.25.93.9 0 1.65-.3 2.25-.93 1.2-1.2 1.2-3.24 0-4.47-.6-.6-1.35-.9-2.25-.9-.9 0-1.65.3-2.25.9zM37.38 20h-5.4V4.4h4.8l.27 2.79c1.11-2.07 2.94-3.09 5.52-3.09l-.09 5.55h-1.14c-2.61 0-3.93 1.23-3.96 4.14V20z"
                        fill={variant === 'light' ? '#FFF' : '#000'}
                    />
                    <path
                        d="M41.7487499 19.34c-1.26-1.26-1.26-3.42 0-4.68 1.26-1.26 3.42-1.26 4.68 0 1.26 1.26 1.26 3.42 0 4.68-1.26 1.26-3.42 1.26-4.68 0z"
                        fill="#00EDF7"
                    />
                </g>
            </Container>
        </Link>
    </Fragment>
);

export default Logo;
