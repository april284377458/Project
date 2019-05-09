<style lang="less"> 
@home : ~"app-home";
.@{home} {
    height: 100%;
    display: flex; 
    background-color: rgba(0, 0, 0, 0.067) 
    // flex-flow: <flex-direction> || <flex-wrap>;
}

</style>
<template>
  <div :class="prefix">

  </div>
</template>
<script> 

const prefix = "app-home"; 
export default { 
  data() {
    return {
      prefix: prefix, 
    };
  }
};
</script>