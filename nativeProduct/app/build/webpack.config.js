const merge = require("webpack-merge");
const webpack = require("webpack");  
const renderer = require("./renderer.config.js"); 
const  main  = require("./main.config.js"); 
const predefine = { main , renderer };
const path = require("path");  
 
module.exports = function (env, argv) {  
    const component =  argv._[0]; 
    
    const base = { 
      mode: env,  
      entry: __dirname + "../src/main/main.js", //已多次提及的唯一入口文件
      output: {
            path: __dirname + "../dist/main",
            filename: "bundle-[hash].js"
      },
      module: {
          rules: [{
                  test: /(\.jsx|\.js)$/,
                  use: {
                      loader: "babel-loader"
                  } 
              }
          ],  
      }, 
      watch: !!env.watch,
      devtool: env === "development" ? "eval-source-map" : "cheap-module-source-map",  
      plugins: [
        new webpack.DefinePlugin({
          PRODUCTION: JSON.stringify(!env.dev)
        })
      ]
    };

    return  base;
    // if(Reflect.has(predefine,component)){ 
    //     console.log("-----1-------");
    //     console.log(predefine[component]);
    //     merge(base, predefine[component]);
    //     console.log("-----2-------");
    // }  
   
    
}