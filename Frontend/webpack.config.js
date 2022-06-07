/* eslint-disable no-undef */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
require('babel-polyfill');

module.exports = (env, argv) => ({
    entry: ['babel-polyfill', path.join(__dirname, 'src', 'index.tsx')],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'index-bundle.js',
        publicPath: argv.mode === 'production' ? '/' :'http://localhost:8000/',
        clean: true
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(argv.mode)
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html'),
            filename: path.join(__dirname, 'build', 'index.html')
        }),
        new CompressionPlugin()
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader'
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: {
                    loader: 'svg-url-loader',
                    options: {
                        encoding: 'base64'
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        compress: true,
        historyApiFallback: true,
        port: 8000,
        allowedHosts: [
            'localhost:8080'
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            net: false
        }
    },
});
