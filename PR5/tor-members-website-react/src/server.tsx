import express from 'express';
import React, { Fragment } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './components/App';
import { ServerStyleSheet } from 'styled-components';

import { HelmetData } from 'react-helmet';
import morgan from 'morgan';
import GlobalStyle from './globalStyling';
import createClient from './createClient';

let assets: any;

const syncLoadAssets = () => {
    assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const server = express();

export interface Context {
    url?: string;
    helmet?: HelmetData;
    status?: number;
}

server
    .disable('x-powered-by')
    .use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
    .get('/*', (req: express.Request, res: express.Response) => {
        const context: Context = {};
        const client: any = createClient();
        const sheet = new ServerStyleSheet();
        const tree = (
            <Fragment>
                <StaticRouter context={context} location={req.url}>
                    <App context={context} client={client} />
                </StaticRouter>
                <GlobalStyle />
            </Fragment>
        );

        const markup = renderToString(sheet.collectStyles(tree));
        const styleTags = sheet.getStyleTags();
        const state = JSON.stringify(client.extract()).replace(/</g, '\\u003c');
        if (context.url) {
            return res.redirect(301, context.url);
        }

        if (context.status) {
            res.status(context.status);
        }

        res.send(
            `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        ${
            context.helmet
                ? `
            ${context.helmet.title.toString()}
            ${context.helmet.meta.toString()}
        `
                : ''
        }
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="author" content="Oberon Amsterdam, www.oberon.nl" />
        <script>
            window.__initialState = ${state};
        </script>
        ${
            assets.client.css
                ? `<link rel="stylesheet" href="${assets.client.css}">`
                : ''
        }
          ${
              process.env.NODE_ENV === 'production'
                  ? `<script src="${assets.client.js}" defer></script>`
                  : `<script src="${
                        assets.client.js
                    }" defer crossorigin></script>`
          }
          ${styleTags}
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
        );
    });

export default server;
