<style lang="less"> 
@home : ~"app-login";
.@{home} { 
    display: flex;  
}  
</style>

<template>
  <div> 
       
      <input type="text" v-model="name" :style="`width:100px`"/>
      <input type="text" v-model="password" :style="`width:100px`"/>
      <button @click="submit">提交</button>
  </div>
</template>
<script>  
import axios from "axios";
axios.defaults.timeout = 5000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头
axios.defaults.baseURL = 'http://127.0.0.1:3000';   //配置接口地址
 
// //POST传参序列化(添加请求拦截器)
// axios.interceptors.request.use((config) => {
//     //在发送请求之前做某件事
//     if(config.method  === 'post'){
//         config.data = qs.stringify(config.data);
//     }
//     return config;
// },(error) =>{
//      _.toast("错误的传参", 'fail');
//     return Promise.reject(error);
// });
 
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
    //对响应数据做些事
    if(!res.data.success){ 
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    _.toast("网络异常", 'fail');
    return Promise.reject(error);
});

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    config.headers.common['Authorization'] = 'Bearer ' + token;
    return config;
})

const prefix = "app-login"; 
export default { 
  data() {
    return {
      prefix: prefix, 
      name : "小王吧",
      password : 123456
    }
  },
  methods :{
    submit(){
        axios.post('/users/login', {
            name: this.name,
            password: this.password
        }).then(res => { 
            alert("登录成功~");
            localStorage.setItem('token', res.data);
            localStorage.setItem('token_exp', new Date().getTime()); 
        });
    }
  }
};
</script>