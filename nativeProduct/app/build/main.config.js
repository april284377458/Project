
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
 
module.exports = {
    target: "electron-main",
    context: path.resolve(__dirname, "../src/main"),
    entry: {
        app: "./app.js"
    },
    output: {
        path: __dirname + "/../dist/main",
        filename: "[name]-bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "source-map-loader"
                }
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(["../dist/main"],{
            "root": path.resolve(__dirname, '../dist/'), 
        }),
    ]
}