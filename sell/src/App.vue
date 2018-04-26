<template>
  <div id="app">
      <div class="header">
        <HeaderCom></HeaderCom>
      </div>
      <div class="nav">
          <a href="javaScript:;">商品</a>
          <a href="javaScript:;">评价</a>
          <a href="javaScript:;">商家</a>
      </div>
      <div class="content">

      </div>
  </div>
</template>

<script>
import HeaderCom from '@/components/header/header'
export default {
  name: 'App',
  components: {
    HeaderCom,
  }
}
</script>

<style scoped="scoped">

.nav{
  width: 100%;
  height: 40px;
  display: flex;
}
.nav a{
  display: block;
  flex: 1;
  text-align: center;
  line-height: 40px;
  color:rgb(77.85.93);
  font-size: 14px;
}
</style>
