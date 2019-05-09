const merge = require("webpack-merge");
const webpack = require("webpack"); 
const renderer = require("renderer.json"); 
const main = require("main.json"); 
const path = require("path"); 


const lib = Symbol("node_modules");

module.exports = function (env, argv) {  
    const components =  argv._;

    const base = {
      context : path.resolve(__dirname, "../page/src/renderer/main"),
      mode: env,
      node: {
        __dirname: false,
        __filename: false
      },
      watch: !!env.watch,
      devtool: env === "development" ? "eval-source-map" : "cheap-module-source-map",  
      plugins: [
        new webpack.DefinePlugin({
          PRODUCTION: JSON.stringify(!env.dev)
        })
      ]
    };

    let predefine = { main , renderer } 
    for(let com of components){ 
      if(Reflect.has(com)){
         merge(base, predefine[com]);
      } 
    }
    
}