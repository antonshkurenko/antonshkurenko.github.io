const path = require('path');

module.exports = {
    entry: {
        name: './src/name.js',
        bg: './src/background.js',
        main: './src/main.js',
        keys: './src/keys.js',
        birthday2019: './src/birthday2019.js',
        birthday2020: './src/birthday2020.js',
        cocktails: './src/cocktails.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/typescript']
                    }
                }
            }
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