const path = require('path');
const  webpack = require('webpack');
const  ManifestPlugin = require('webpack-manifest-plugin');
const  WebpackHashSync = require("webpack-hash-sync");
const  fs = require("fs");
const  hotMiddlewareScript = ['webpack-hot-middleware/client?reload=true']; //不加reload就会在强制更新的时候不更新
const  WriteFilePlugin = require('write-file-webpack-plugin');

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
    apps = [...hotMiddlewareScript,'./common/enter/index.js'];//hotMiddlewareScript
    addPlugins = [];
}

module.exports = {
    devtool: 'sourcemap',
    entry: {
        app: apps,
        // vendor: ['react','react-dom']
    },
    output: {
        path: path.join(__dirname, 'public/javascripts/'),
        filename: '[name].[hash].js',
        publicPath: 'http://localhost:7777/javascripts/', //publicPath相当于告诉热更新你的存放路径
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     filename: 'common.min.js',
        //     minChunks:Infinity,
        //     // chunks: ['app'], // 注意这里如果有chunks，chunks里面的内容相当于是被减数, 如果在entry中增加了文件，请记得在这里进行更改
        // }),
        new ManifestPlugin(),
        //todo: common chunk or external
        new WebpackHashSync({
            file: ["app.*?js"],
            path: path.join(__dirname, 'public/'),
            html: ["index.html"],
            hash: true,
            chunkhash: false
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new WriteFilePlugin({ //这个可以解决json 404的问题
            test: /\.hot-update\.js.*?$/,
            useHashIndex: true
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),

        // 开发环境不启用,生产环境应当启用
        ...addPlugins
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, 'common'),
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader",
                ]
            },
            {
                test: /\.css/,
                use: [
                    "style-loader" ,
                    "css-loader"
                ]
            },
        ]
    },
};
