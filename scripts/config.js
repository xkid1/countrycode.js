const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const version = process.env.VERSION || require('../package.json').version;

const banner =
    '/*!\n' +
    ` *  ${require('../package.json').name} v${version}\n` +
    ` *  (c) ${new Date().getFullYear()} ${
        require('../package.json').author
    }\n` +
    ` *  @license ${require('../package.json').license}\n` +
    ' */';

const builds = {
    production: {
        mode: 'production',
        target: 'web',
        env: 'production',
        entry: './src/main.ts',
    },
    development: {
        mode: 'development',
        target: 'web',
        env: 'development',
        entry: './src/main.ts',
    },
    test: {
        mode: 'test',
        target: 'web',
        env: 'test',
        entry: './src/main.ts',
    },
};

function getConfig(name) {
    const opts = builds[name];
    const vars = {
        PRODUCTION: JSON.stringify(name === 'development' ? false : true),
        VERSION: version,
        __DEV__: process.env.NODE_ENV !== 'production',
        __PROD__: process.env.NODE_ENV === 'production',
        __TEST__: process.env.NODE_ENV === 'test',
    };

    vars.__DEV__ = JSON.stringify(name === 'development' ? false : true);

    const config = Object.assign(
        {
            output: {
                path: path.resolve(__dirname, '../dist/src'),
                filename: '[name].js',
                publicPath: 'dist',
                globalObject: 'this',
            },
            resolve: {
                extensions: ['.ts', '.js'],
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        loader: 'ts-loader',
                        exclude: /node_modules/,
                    },
                ],
            },
            plugins: [
                new webpack.DefinePlugin(vars),
                new webpack.BannerPlugin(banner),
            ],
        },
        opts
    );

    Object.defineProperty(config, '_name', {
        enumerable: false,
        value: name,
    });

    delete config.env;

    return config;
}

const target = process.argv[process.argv.length - 1];

if (target == 'development') {
    module.exports = () => getConfig(target);
} else {
    exports.getBuild = getConfig;
    exports.getAllBuilds = () => Object.keys(builds).map(getConfig);
}
