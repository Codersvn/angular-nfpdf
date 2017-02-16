var path = require('path');

module.exports = {
    entry: './src/nfpdf.js',

    output: {
        filename: 'nfpdf.js',
        path: path.resolve(__dirname, 'dist')
    },
    node: {
        fs: "empty"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]

    }
};
