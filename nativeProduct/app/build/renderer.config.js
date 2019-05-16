
const path = require("path"); 
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin"); 
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = function(env){
    return { 
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
                    test: /\.vue$/,
                    use:  ["vue-loader"],  
                }, 
                {
                    test: /\.css$/,
                    use: [ 
                        {
                            loader: 'vue-style-loader'
                        },
                        {
                            loader: 'css-loader', 
                            options: {
                                sourceMap: true, importLoaders: 1
                            }
                        }                     
                    ]
                },
                {
                    test: /\.less$/,
                    exclude : '/node_modules',
                    use: [ 
                        {
                            loader: 'vue-style-loader'
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
            new VueLoaderPlugin(),
            new CleanWebpackPlugin(["../dist/renderer"],{
                "root": path.resolve(__dirname, '../dist/'), 
            }),
            new htmlWebpackPlugin({ 
                inject: 'body', 
                chunks: ["home"],
                template: "./pages/template.html",
                filename: "./home.html"
            }), 
            new CopyWebpackPlugin([
                "*.json",  
                {
                    from: `../../node_modules/vue/dist/vue.runtime${env.dev === "development" ? "" : ".min"}.js`,
                    to: `./node_modules/vue/index.js`
                }, 
            ]),
        ]
    }
}