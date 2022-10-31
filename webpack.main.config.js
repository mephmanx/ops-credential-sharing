const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    /**
     * This is the main entry point for your application, it's the first file
     * that runs in the main process.
     */
    entry: './src/index.ts',
    // Put your normal webpack config below here
    module: {
        rules: require('./webpack.rules')
    },
    target: 'electron-main',
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
        modules: [path.resolve(__dirname, 'main'), 'native_modules'],
        fallback: {
            fs: false,
            child_process: require.resolve('child_process'),
            assert: require.resolve('assert'),
            buffer: require.resolve('buffer'),
            console: require.resolve('console-browserify'),
            constants: require.resolve('constants-browserify'),
            crypto: require.resolve('crypto-browserify'),
            domain: require.resolve('domain-browser'),
            events: require.resolve('events'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            os: false,
            path: require.resolve('path-browserify'),
            punycode: require.resolve('punycode'),
            process: require.resolve('process/browser'),
            querystring: require.resolve('querystring-es3'),
            stream: require.resolve('stream-browserify'),
            string_decoder: require.resolve('string_decoder'),
            sys: require.resolve('util'),
            timers: require.resolve('timers-browserify'),
            tty: require.resolve('tty-browserify'),
            url: require.resolve('url'),
            util: require.resolve('util'),
            vm: require.resolve('vm-browserify'),
            zlib: require.resolve('browserify-zlib'),
        },
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './src/splash.html'),
                    to: path.resolve(__dirname, './.webpack/main/')
                },
                {
                    from: path.resolve(__dirname, './src/splash.css'),
                    to: path.resolve(__dirname, './.webpack/main/')
                },
                {
                    from: path.resolve(__dirname, './src/fe/assets'),
                    to: path.resolve(__dirname, `./.webpack/renderer/Asset/`)
                }
            ]
        })
    ],
    optimization: {
        // Typeorm depends on entity class name to create table alias
        // if none were defined before, and since webpack minimizes all class name
        // on production it causes typeorm to mess up every database query.
        // Therefore turning webpack minification off is a must.
        // REFERENCE: https://github.com/typeorm/typeorm/issues/4266#issuecomment-505139399
        minimize: false
    }
};