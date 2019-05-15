
const path = require("path"); 
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