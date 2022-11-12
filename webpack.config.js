module.exports = {
    entry: {
        name: './src/name.js',
        bg: './src/background.js',
        main: './src/main.js',
        keys: './src/keys.js',
        birthday2019: './src/birthday2019.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
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