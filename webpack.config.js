var path = require('path');

module.exports = {
    entry: './src/nfpdf.js',

    output: {
        filename: 'nfpdf.js',
        path: path.resolve(__dirname, 'dist')
    },
    node: {
        fs: "empty"
    }
};
