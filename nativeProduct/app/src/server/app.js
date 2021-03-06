const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const fs = require('fs'); 
const index = require('./routes/index')
const users = require('./routes/users') 
const koajwt = require('koa-jwt');
// error handler
onerror(app) 
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// const drouter = require('koa-router')()
// const redirect = ctx => {
//   // ctx.response.redirect('/');
//   ctx.response.body = '<a href="/">Index Page</a>';
// };
// drouter.get('/redirect', redirect) 
// app.use(drouter.routes()); 
// app.use(main);


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

// 错误处理
app.use((ctx, next) => {
  return next().catch((err) => {
      if(err.status === 401){
          ctx.status = 401;
          ctx.body = 'Protected resource, use Authorization header to get access\n';
      }else{
          throw err;
      }
  })
})

app.use(koajwt({
  secret: 'my_token'
}).unless({
  path: [/\/users\/login/]
}));


module.exports = app
