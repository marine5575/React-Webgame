const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'word-relay-setting',
    mode: 'development',    // 실서비스: production
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx'],
    },

    entry: {
        app: ['./client'],
    },  // 입력

    module: {
        rules: [{
            test: /\.jsx?/, // 규칙을 적용할 파일들
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 1% in KR'],   // browserslist
                        },
                        debug: true,
                    }],
                    '@babel/preset-react'
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel'
                ],
            },
        }],
    },
    plugins: [
        new RefreshWebpackPlugin()
    ],
    output: {
        path: path.join(__dirname, 'dist'), // C:\Users\jennie.ko\Desktop\react\lecture\dist
        filename: 'app.js',
        publicPath: '/dist/'
    },  // 출력
    devServer: {
        devMiddleware: { publicPath: '/dist/' },
        static: { directory: path.resolve(__dirname) },
        hot: true,
    },
};
