const path = require('path');

module.exports = {
    entry: {
        letters: './src/letters.js',
        bg: './src/background.js',
        main: './src/main.js',
        keys: './src/keys.js',
        birthday2019: './src/birthday2019.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    watch: true,
    watchOptions: {
        aggregateTimeout: 1000,
        ignored: ['node_modules'] //'dist/**/*.js',
    }
};