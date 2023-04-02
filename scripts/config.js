const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const version = process.env.VERSION || require('../package.json').version;
const fileEntry = fs
    .readdirSync('./src')
    .reduce((acc, v) => ({ ...acc, [v]: `./src/${v}` }), {});

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
        target: 'node',
        env: 'production',
        entry: './src/countrycode.ts',
    },
    development: {
        mode: 'development',
        target: 'node',
        env: 'development',
        entry: './src/countrycode.ts',
    },
    test: {
        mode: 'test',
        target: 'node',
        env: 'test',
        entry: './src/countrycode.ts',
    },
    compiler: {
        mode: 'compiler',
        target: 'node',
        env: 'compiler',
        entry: './src/countrycode.ts',
    },
};

function getConfig(name) {
    const opts = builds[name];

    const vars = {
        PRODUCTION: JSON.stringify(process.argv[5] === '--env' ? false : true),
        VERSION: version,
        __DEV__: process.env.NODE_ENV !== 'production',
        __PROD__: process.env.NODE_ENV === 'production',
        __TEST__: process.env.NODE_ENV === 'test',
    };

    if (opts.env) {
        vars.__DEV__ = JSON.stringify(
            process.argv[5] === '--env' ? false : true
        );
    }

    const config = Object.assign(
        {
            output: {
                path: path.resolve(__dirname, '../dist'),
                filename: '[name].js',
                publicPath: 'dist',
            },
            resolve: {
                extensions: ['.ts', '.js'],
                alias: {
                    '@': path.resolve(__dirname, '../src'),
                },
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

if (process.env.npm_lifecycle_script.split(' ')[4]) {
    module.exports = (env) => getConfig(env.TARGET);
} else {
    exports.getBuild = getConfig;
    exports.getAllBuilds = () => Object.keys(builds).map(getConfig);
}
