import Vue from "vue" 
import Home from "./Home.vue";
import Router from 'vue-router';
import A from '../../components/home/A.vue';
import B from '../../components/home/B.vue';
import C from '../../components/home/C.vue'; 
Vue.use(Router);

const routes = [
    { path: '/a', component: A },
    { path: '/b', component: B },
    { path: '/c', component: C }
  ];
  
const router = new Router({
    mode: 'history',
    routes
});
   
new Vue({
    render: h => h(Home),
    router,
}).$mount("#root"); 