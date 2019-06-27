const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger') 
const index = require('./routes/index')
const users = require('./routes/users');
const helmet = require('koa-helmet'); 
const jwt = require('jsonwebtoken');
const extendWebpack= require('./system/koa-webpack'); 
extendWebpack(app);

onerror(app); 
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(helmet());
app.use(json())
app.use(logger((str, args) => {
   
}))
app.use(require('koa-static')(__dirname + '/dist/static')) 
app.use(views(__dirname + '/dist/pages'));

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
