
const path = require("path"); 
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
 

module.exports = { 
    target: "electron-renderer",
    context: path.resolve(__dirname, "../src/renderer"),
    entry: {
        home: "./pages/home/index.js", 
    },
    output: {
        path: __dirname + "/../dist/renderer",
        filename: "[name]-bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "source-map-loader"
                },

            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    }                     
                ]
            },
            {
                test: /\.less$/,
                exclude : '/node_modules',
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',   
                        options: {
                            sourceMap: true, importLoaders: 1
                        }
                    }, 
                    {
                        loader: 'less-loader',   
                        options: {
                            sourceMap: true, importLoaders: 1
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(["../dist/main"],{
            "root": path.resolve(__dirname, '../dist/'), 
        }),
        new htmlWebpackPlugin({
            template: './pages/index.html',
            inject: 'body',
            filename: '[name].html'
        })
    ]
}