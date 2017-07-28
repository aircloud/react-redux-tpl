const path = require('path');
const  webpack = require('webpack');
const  ManifestPlugin = require('webpack-manifest-plugin');
const  WebpackHashSync = require("webpack-hash-sync");
const  fs = require("fs");
const  hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

let apps,addPlugins;

if(process.env.NODE_ENV === "production") {
    apps = ['./common/enter/index.js'];
    addPlugins = [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
    ]
} else {
    apps = ['./common/enter/index.js', hotMiddlewareScript];
    addPlugins = [];
}

module.exports = {
    devtool: 'sourcemap',
    entry: {
        vendor: ['react','react-dom','redux','react-redux','react-router','react-router-redux'],
        app: apps, //目前是只要有vendor就报错
    },
    output: {
        path: path.join(__dirname, 'public/javascripts'),
        filename: '[name].[hash].js',
        publicPath: '/javascripts/',
    },
    plugins: [
        new ManifestPlugin(),
        // new webpack.optimize.ModuleConcatenationPlugin(),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'common.min.js',
            // chunks: ['app'], // 注意这里如果有chunks，chunks里面的内容相当于是被减数, 如果在entry中增加了文件，请记得在这里进行更改
        }),

        // new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: "common.min.js", minChunks: Infinity,}),
        new WebpackHashSync({
            file: ["app.*?js"],
            path: path.join(__dirname, 'public/'),
            html: ["index.html"],
            hash: true,
            chunkhash: false
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // 开发环境不启用,生产环境应当启用
        ...addPlugins
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, 'common'),
                exclude: /node_modules/,
                use: ['react-hot-loader', 'babel-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
};
