<style lang="less"> 
@home : ~"app-home";
.@{home} { 
    display: flex; 
    background-color: rgba(197, 25, 25);  
} 
.tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px; 
}
.tab-item{
  flex: 1;
  text-align: center;
}
</style>

<template>
  <div> 
    <div class="tab"> 
      <div class="tab-item">
        <router-link to="/a">商品</router-link>
      </div> 
      <div class="tab-item">
        <router-link to="/b">评论</router-link>
      </div> 
      <div class="tab-item">
        <router-link to="/c">商家</router-link>
      </div> 
    </div> 
    <router-view></router-view> 
  </div>
</template>
<script>  

const prefix = "app-home"; 
export default { 
  data() {
    return {
      prefix: prefix, 
      count : 1,
    }
  },
  methods :{
    changeClick(){
       this.count++;
    }
  }
};
</script>