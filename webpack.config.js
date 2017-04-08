
var path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public/');
const SOURCE_DIR = path.resolve(__dirname, 'client/');

var config = {
    entry: ['whatwg-fetch', path.join(SOURCE_DIR, 'index.js')],

    output: {
        path: path.join(BUILD_DIR, 'js'),
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.js?/,
                include: SOURCE_DIR,
                loader: 'babel-loader'
            }
        ]
    }
};
module.exports = config;