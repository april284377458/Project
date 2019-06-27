const router = require('koa-router')();

router.get('/', async (ctx, next) => {
  await ctx.render('login', {
    title: 'Hello Koa 2!'
  })
})
module.exports = router
