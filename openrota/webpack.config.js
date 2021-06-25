const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

const fileRegEx = /\.(png|woff|woff2|eot|ttf|svg|gif|jpe?g|png)(\?[a-z0-9=.]+)?$/;

module.exports = (env, argv) => {
  const isDevelopment = process.env.NODE_ENV !== 'production';
  return {
    entry: {
      // we add an entrypoint with the same name as our name in ModuleFederationPlugin.
      // This merges the two "chunks" together. When a remoteEntry is placed on the page,
      // the code in this kas-connectors entrypoint will execute as part of the remoteEntry startup.
      main: './src/index.tsx',
    },
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      open: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers':
          'X-Requested-With, content-type, Authorization',
      },
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: path.join(__dirname, 'src'),
          use: [
            {
              loader: 'ts-loader',
            },
          ],
        },
        {
          test: /\.css|s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
          sideEffects: true,
        },
        {
          test: fileRegEx,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new Dotenv({
        systemvars: true,
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico',
        title: "Openrota"
      }),
      new CopyPlugin({
        patterns: [{ from: './src/locales', to: 'locales' }],
      }),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[id].[contenthash:8].css' : '[name].css',
        chunkFilename: isDevelopment ? '[id].[contenthash:8].css' : '[id].css',
        ignoreOrder: true, // Enable to remove warnings about conflicting order
      }),
      new webpack.HotModuleReplacementPlugin(),
      isDevelopment && new webpack.HotModuleReplacementPlugin(),
      isDevelopment && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
  };
};
