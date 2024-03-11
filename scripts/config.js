const path = require('path');

const builds = {
  production: {
    mode: 'production',
    entry: './src/inde.ts',
    devtool: 'source-map',
    optimization: {
      minimize: true,
    },
  },
  development: {
    mode: 'development',
    entry: './src/inde.ts',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hot: true,
    },
  },
};

function getConfig(name) {
  const opts = builds[name];

  const config = Object.assign(
    {
      output: {
        path: path.resolve(__dirname, '../dist/src'),
        filename: '[name].js',
        publicPath: 'dist',
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
      plugins: [],
    },
    opts
  );
  return config;
}

exports.getConfig = getConfig;
