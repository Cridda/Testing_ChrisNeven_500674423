import React, { Fragment, SFC } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, StaticContext } from 'react-router';
import Helmet from 'react-helmet-async';

const Title = styled.div`
    background: black;
    padding: 4rem 1rem;
    text-align: center;
    color: white;
    font-size: large;
`;

const NotFound: SFC<RouteComponentProps<{}, StaticContext>> = ({ staticContext }) => {
    if (staticContext) {
        staticContext.statusCode = 404;
    }

    return (
        <Fragment>
            <Helmet>
                <title>Page not found</title>
                <meta name="description" content="This page could not be found." />
            </Helmet>
            <Title>Page not found!</Title>
        </Fragment>
    );
};

export default NotFound;
