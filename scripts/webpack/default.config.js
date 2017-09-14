const p = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: p.resolve(),

    entry: {
        index: './src/web/index.js'
    },

    output: {
        path: p.resolve(process.env.WEBPACK_BUILD_DIR || './build'),
        filename: '[name].js'
    },

    resolve: {
        extensions: ['.js']
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract('css-loader')
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                BROWSER: JSON.stringify(true)
            }
        }),
        new HtmlPlugin({
            template: './src/web/index.html'
        }),
        new ExtractTextPlugin({
            filename: 'style.css'
        })
    ],

    devtool: process.env.WEBPACK_DEVTOOL || 'source-map'
};
