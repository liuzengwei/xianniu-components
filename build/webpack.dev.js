const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackConfig = {
    mode: process.env.NODE_ENV,
    entry: "./examples/entry.js",
    output: {
        path: path.resolve(process.cwd(), './dist'),
        publicPath: process.env.CI_ENV || '',
        filename: '[name].[hash:7].js',
        chunkFilename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.resolve(__dirname, '../src'),
        },
        modules: ['node_modules']
    },
    devServer: {
        host: '0.0.0.0',
        port: 9709,
        publicPath: '/',
        inline: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(js|jsx?|babel|es6)$/,
                include: process.cwd(),
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    plugins: ['syntax-dynamic-import']
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader',
                // todo: 这种写法有待调整
                query: {
                    limit: 10000,
                    name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './examples/index.html',
            filename: './index.html'
        }),
        new VueLoaderPlugin(),
        new webpack.LoaderOptionsPlugin({
            vue: {
                compilerOptions: {
                    preserveWhitespace: false
                }
            }
        })
    ]
}

module.exports = webpackConfig