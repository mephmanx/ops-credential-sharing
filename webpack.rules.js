module.exports = [
    // Add support for native node modules
    {
        test: /\.node$/,
        use: 'node-loader'
    },
    {
        test: /\.(m?js|node)$/,
        parser: { amd: false },
        use: {
            loader: '@timfish/webpack-asset-relocator-loader',
            options: {
                outputAssetBase: 'node_modules'
            }
        }
    },
    {
        test: /\.tsx?$/,
        exclude: /(node_modules|\.webpack)/,
        use: {
            loader: 'ts-loader',
            options: {
                transpileOnly: true
            }
        }
    },
    {
        test: /\.(eot|woff|ttf)$/,
        use: 'file-loader'
    }
];