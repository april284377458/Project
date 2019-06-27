const router = require('koa-router')()
const fs = require('fs');

router.get('/', async (ctx, next) => {
  ctx.response.type = 'html';
  ctx.response.body = await fs.readFileSync('./dist/pages/home.html');
})

// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })

// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })

module.exports = router
