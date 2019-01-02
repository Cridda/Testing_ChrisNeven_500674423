import React, { SFC, Fragment } from 'react';
import Helmet from 'react-helmet-async';
import Navigation from './organisms/Navigation';
import { Route } from '../constants/routes';
import { match } from 'react-router';
import { renderRoutes } from 'react-router-config';

export interface Props {
    route: Route;
    match: match;
}

const Accommodation: SFC<Props> = props => {
    const { route } = props;
    return (
        <Fragment>
            <Navigation route={route} />
            {renderRoutes(route.routes)}

            <Helmet>
                <title>Accommodation</title>
                <meta name="description" content="The Accommodation page." />
            </Helmet>
        </Fragment>
    );
};

export default Accommodation;
