const router = require('koa-router')()
const jwt = require('jsonwebtoken');  
router.prefix('/users') 

router.post('/login', async (ctx) => {
  const data = ctx.request.body;
  if(!data.name || !data.password){
      return ctx.body = {
          code: '000002',
          data: null,
          msg: '参数不合法'
      }
  }
  // const result = await userModel.findOne({
  //     name: data.name,
  //     password: data.password
  // });
  let result;
  if(data.name === "小王吧" && data.password === 123456){
    result = { _id : 12222 , name : "王根基"};
  }

  if(result !== null){
      const token = jwt.sign({
          name: result.name,
          _id: result._id
      }, 'my_token', { expiresIn: '2h' });
      return ctx.body = {
          success: true,
          data: token,
          msg: '登录成功'
      }
  }else{
      return ctx.body = {
          code: '000002',
          data: null,
          msg: '用户名或密码错误'
      }
  }
});
 

module.exports = router
