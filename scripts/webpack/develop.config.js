const merge = require('webpack-merge');
const defaultConfig = require('./default.config');

module.exports = merge(defaultConfig, {
    output: {
        pathinfo: true
    },

    devServer: {
        contentBase: './dist',
        port: 3000,
        host: '0.0.0.0',
        stats: {
            modules: false,
            cached: false,
            colors: true,
            chunk: false
        },
        proxy: {
            "/api": {
                target: "http://localhost:8080"
            }
        }
    }
});
