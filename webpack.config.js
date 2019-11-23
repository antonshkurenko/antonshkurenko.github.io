const path = require('path');

module.exports = {
    entry: {
        letters: './src/letters.js',
        bg: './src/background.js',
        main: './src/main.js',
        keys: './src/keys.js',
        birthday2019: './src/birthday2019.js',
        birthday2019ts: './src/birthday2019ts.ts',
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
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};