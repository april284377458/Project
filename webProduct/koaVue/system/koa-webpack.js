const webpack = require('webpack') 
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');
const devConfig =  require('../build/webpack.config.js');
const compile = webpack(devConfig); 
 
module.exports = function(app){ 
  
  app.use(devMiddleware(compile, {  
  }));

  app.use(hotMiddleware(compile, { })); 
}
