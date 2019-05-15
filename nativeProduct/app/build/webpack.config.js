const merge = require("webpack-merge");
const webpack = require("webpack");  
const erenderer = require("./renderer.config.js"); 
const main  = require("./main.config.js"); 
const predefine = { main  , erenderer };
const path = require("path");  

module.exports = function (env, argv) {   
    const component =  env.entry;  
    const base = { 
        mode: env.dev,   
        watch: !!env.watch,
        devtool: env.dev === "development" ? "eval-source-map" : "cheap-module-source-map",   
        plugins: [ 
          new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(env.dev === "production")
          }),
        ]
    };     
    if(Reflect.has(predefine,component)){   
       let a = merge(base, predefine[component]);    
       return a;
    }   
  }