const merge = require('webpack-merge');
const defaultConfig = require('./default.config');
const ClearWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(defaultConfig, {
    plugins: [
        new ClearWebpackPlugin(['./dist'])
    ]
});
