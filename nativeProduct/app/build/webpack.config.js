const merge = require("webpack-merge");
const webpack = require("webpack"); 
const renderer = require("renderer.config.js"); 
const main = require("main.config.js"); 

const lib = Symbol("node_modules");

module.exports = function (env, argv) {  
    const components =  argv._;

    const base = {
      mode: env.dev ? "development" : "production",
      node: {
        __dirname: false,
        __filename: false
      },
      watch: !!env.watch,
      devtool: false,
      externals: [
        function (context, request, callback) {
          //仅引用路径不在node_modules中的json文件认为是externals引用
          //用于项目配置文件
          if (/\.json/.test(request)
            && !/node_modules/.test(request)
            && !/node_modules/.test(context)) {
            return callback(null, `commonjs ${request}`);
          }
          for (const regex of externals) {
            if (regex.test(request)) {
              return callback(null, `commonjs ${request}`);
            }
          }
          callback();
        }
      ],
      module: {
        rules: [
          {
            test: /\.js$/,
            use: ["source-map-loader"],
            enforce: "pre"
          }
        ]
      },
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