import Vue from "vue" 
import Home from "./Home.vue";
import VueRouter from 'vue-router';
import A from '../../components/home/A.vue';
import B from '../../components/home/B.vue';
import C from '../../components/home/C.vue'; 
Vue.use(VueRouter);

const routes = [
    { path: '/a', component: A },
    { path: '/b', component: B },
    { path: '/c', component: C },
    {
      path: '*',  
      redirect: '/a'
    }
  ];
  
const router = new VueRouter({
    mode: 'history',
    routes
});
   
let a = new Vue({
    render: h => h(Home),
    router,
}).$mount("#root");  