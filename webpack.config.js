
var path = require('path');
var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var WebpackHashSync = require("webpack-hash-sync");
var fs = require("fs");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

module.exports = {

    devtool: 'sourcemap',
    entry: {
        app:
            ['./common/enter/index.js',hotMiddlewareScript],
        vendor: ["react-redux","react-router"],
    },
    output: {
        path: path.join(__dirname, 'public/javascripts'),
        filename: 'output.[chunkhash].js',
        publicPath:'http://localhost:7777/javascripts/',
    },
    plugins: [
        new ManifestPlugin(),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: "common.[hash].js" }),
        new WebpackHashSync({
            file:["output.*?js","common.*?js"],
            path:path.join(__dirname, 'public/'),
            html:["index.html"],
            hash:true,
            chunkhash:false
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
        //开发环境不启用,生产环境应当启用
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, 'common'),
                loader: ['react-hot-loader','babel-loader'],
                exclude: /node_modules/,

            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.css/,
                loader: 'style-loader!css-loader'
            },
        ]
    }
};
