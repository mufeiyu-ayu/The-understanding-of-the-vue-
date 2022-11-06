const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { resolve } = require('path')
module.exports = {
    entry: './src/index.js',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        static: './dist'
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader'
                        // options: { modules: true }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: resolve(__dirname, 'dist'),
        clean: true
    }
}
