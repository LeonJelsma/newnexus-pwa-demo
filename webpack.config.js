const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest');


module.exports = {
    entry: './src/main.ts',
    plugins: [
        new webpack.ProgressPlugin(function (percentage, message, ...args) {
            console.log("Building: ", percentage, message, args)
        }),
        new CleanWebpackPlugin(),
        new WebpackPwaManifest({
            name: "New Nexus PWA Demo",
            short_name: "Demo",
            start_url: "./index.html",
            display: "standalone",
            background_color: "#2d2c2c",
            theme_color: "#0a8305",
            orientation: "portrait-primary",
            icons: [
                {
                    src: 'favicon.svg',
                    sizes: '2048x2048',
                    type: 'image/svg+xml',
                    purpose: 'any maskable'
                },
            ],
        }),
        new FaviconsWebpackPlugin({
            logo: 'favicon.svg',
            mode: 'webapp',
            devMode: 'webapp',

        }),
        new CopyPlugin({
            patterns: [
                {from: "resources", to: "resources"},
            ],
            options: {
                concurrency: 100,
            },
        }),
        new HtmlWebpackPlugin({
            title: 'PWA Demo',
            template: "./src/index.html",
            meta: {
                viewport: 'width=device-width, initial-scale=1'
            }
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            maximumFileSizeToCacheInBytes: 100000000,
        }),
    ],
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/'),
    },
};

