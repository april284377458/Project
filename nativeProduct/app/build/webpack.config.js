const merge = require("webpack-merge");
const webpack = require("webpack");  
const renderer = require("./renderer.config.js"); 
const main  = require("./main.config.js"); 
const predefine = { main  , renderer };
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
      return  merge(base, predefine[component]);     
    }   
  }