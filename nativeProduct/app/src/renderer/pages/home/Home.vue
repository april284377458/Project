<style lang="less"> 
@home : ~"app-home";
.@{home} { 
    display: flex; 
    background-color: rgba(197, 25, 25);  
} 
</style>

<template>
  <div>
    <div :class="prefix">
        大豆豆豆豆豆豆豆豆豆豆豆豆豆豆豆豆{{count}}  
    </div>
    <input type="button" @click="changeClick" value="点我呀"/>  
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