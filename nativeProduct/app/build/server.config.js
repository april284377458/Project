
const path = require("path"); 
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin"); 
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin"); 
const lib = Symbol("node_modules");

module.exports = function(env){ 
    return {  
        target: "node",
        context: path.resolve(__dirname, "../src/server"),
        entry: {
            index: "./index.js"
        }, 
        output: {
            path: __dirname + "/../dist/server/bin",
            filename: "[name]-bundle.js",
        }, 
        externals: [
            function (context, request, callback) { 
                if (/node_modules/.test(request) || /node_modules/.test(context)) {
                    return callback(null, `commonjs ${request}`);
                }
                callback();
            }
        ], 
        plugins: [ 
            new CleanWebpackPlugin(["../dist/server"],{
                "root": path.resolve(__dirname, '../dist/'), 
            }), 
            new CopyWebpackPlugin([
                "*.json",
                {
                  from: "./package.json",
                  to: "../package.json"
                },
                {
                  from: `./node_modules`,
                  to: `../node_modules/`
                }
              ])
        ]
    }
}