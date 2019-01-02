'use strict';

const { ReactLoadablePlugin } = require('react-loadable/webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    externals: [nodeExternals()],
    plugins: [
        {
            name: 'typescript',
            options: {
                useBabel: true,
                tsLoader: {
                    transpileOnly: true,
                    experimentalWatchApi: true
                },
                forkTsChecker: {
                    tsconfig: './tsconfig.json',
                    tslint: './tslint.json',
                    watch: './src',
                    typeCheck: true
                }
            }
        }
    ],
    modify: (config, { target }) => {
        if (target === 'web') {
            return {
                ...config,
                plugins: [
                    ...config.plugins,
                    new ReactLoadablePlugin({
                        filename: './build/react-loadable.json'
                    })
                ]
            };
        }

        return config;
    }
};
