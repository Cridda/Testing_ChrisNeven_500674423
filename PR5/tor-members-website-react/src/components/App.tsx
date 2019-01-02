import React, { Fragment } from 'react';
import Helmet from 'react-helmet-async';
import { HelmetProvider } from 'react-helmet-async';
import { Context } from '../server';
import { renderRoutes } from 'react-router-config';
import { ThemeProvider } from 'styled-components';
import routes from '../constants/routes';
import theme from '../constants/theme';
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

interface Props {
    context: Context;
    client: ApolloClient<NormalizedCacheObject>;
}

const App = ({ context, client }: Props) => (
    <HelmetProvider context={context}>
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <Fragment>
                    <Helmet>
                        <title>Fallback title</title>
                        <meta name="description" content="Fallback description in case routes don't add their own" />
                    </Helmet>
                    {renderRoutes(routes)}
                </Fragment>
            </ThemeProvider>
        </ApolloProvider>
    </HelmetProvider>
);

export default App;
