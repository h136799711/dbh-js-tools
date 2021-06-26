const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "./src/index.html"),
    filename: "./index.html"
});
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const webpack = require('webpack');
const {VueLoaderPlugin} = require('vue-loader');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, "./src/index.js"),
    output: {
        path: path.join(__dirname, "dist/"),
        filename: "[name].[hash:6].js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        }),
        new VueLoaderPlugin(),
        htmlWebpackPlugin,
        new CleanWebpackPlugin()
    ],
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
        port: 8777
    }
};
