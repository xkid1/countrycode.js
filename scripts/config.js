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
        // productionSourceMap: true,
        // devtool: '#source-map',
        // bundleAnalyzerReport: process.env.npm_config_report,
    },
    development: {
        mode: 'development',
        target: 'node',
        env: 'development',
        entry: './src/countrycode.ts',
        // productionSourceMap: false,
        // devtool:
        // bundleAnalyzerReport: process.env.npm_config_report,
    },
    test: {
        mode: 'test',
        target: 'node',
        env: 'test',
        entry: './src/countrycode.ts',

        // productionSourceMap: true,
        // devtool: '#source-map',
        // bundleAnalyzerReport: process.env.npm_config_report,
    },
    compiler: {
        mode: 'compiler',
        target: 'node',
        env: 'compiler',
        entry: './src/countrycode.ts',
        // productionSourceMap: true,
        // devtool: '#source-map',
        // bundleAnalyzerReport: process.env.npm_config_report,
    },
};

function getConfig(name) {
    const opts = builds[name];

    const vars = {
        __VERSION__: version,
        __DEV__: process.env.NODE_ENV !== 'production',
        __PROD__: process.env.NODE_ENV === 'production',
        __TEST__: process.env.NODE_ENV === 'test',
    };

    const config = Object.assign(
        {
            // entry: './src/countrycode.ts',
            output: {
                path: path.resolve(__dirname, '../dist'),
                filename: '[name].js',
                publicPath: 'dist/',
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

    if (opts.env) {
        vars['process.env.NODE_ENV'] = JSON.stringify(opts.env);
        vars.__DEV__ = opts.env !== 'production';
    }

    Object.defineProperty(config, '_name', {
        enumerable: false,
        value: name,
    });

    delete config.env;

    return config;
}

if (process.env.TARGET) {
    module.exports = (env) => getConfig(env.TARGET);
} else {
    exports.getBuild = getConfig;
    exports.getAllBuilds = () => Object.keys(builds).map(getConfig);
}
