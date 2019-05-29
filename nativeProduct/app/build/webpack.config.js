const merge = require("webpack-merge");
const webpack = require("webpack");  
const path = require("path");  


//外部公用模块进行排除 直接进行文件拷贝
const externals = [ 
  /^iview$/,
  /^vue$/, 
];


module.exports = function (env, argv) {   
    const renderer = require("./renderer.config.js")(env); 
    const main  = require("./main.config.js")(env);  
    const server  = require("./server.config.js")(env);
    const predefine = { main  , renderer ,server};

    const component =  env.entry;  
    const base = { 
        mode: env.dev,   
        watch: !!env.watch,
        devtool: env.dev === "development" ? "eval-source-map" : "cheap-module-source-map",   
        externals: [
          function (context, request, callback) { 
            for (const regex of externals) {
                if (regex.test(request)) { 
                  return callback(null, `commonjs ${request}`);  
                }
            }
            callback();
          }
        ],
        module: {
          rules : [
            {
                test: /\.js$/,
                use: [ "source-map-loader" ]
            }
          ],
        }, 
        plugins: [ 
          new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(env.dev === "production")
          }),
        ]        
    };     
    if(Reflect.has(predefine,component)){   
      let a =  merge(base, predefine[component]); 
      return a ;    
    }   
  }