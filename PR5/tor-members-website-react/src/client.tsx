import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import GlobalStyle from './globalStyling';
import Raven from 'raven-js';
import createClient from './createClient';

const client = createClient();

const root = document.getElementById('root');

if (process.env.NODE_ENV === 'production') {
    Raven.config(
        'https://bb40c9b8c43f4b1b818e3d05e804d538@sentry.io/1306040'
    ).install();
}

if (root) {
    ReactDOM.hydrate(
        <Fragment>
            <BrowserRouter>
                <App context={{}} client={client} />
            </BrowserRouter>
            <GlobalStyle />
        </Fragment>,
        root
    );
}

if (module.hot) {
    module.hot.accept();
}
