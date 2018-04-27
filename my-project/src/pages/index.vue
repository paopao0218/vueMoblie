<template>
  <div>
      <div class="header">
          <HeaderCom></HeaderCom>
      </div>
      <div class="nav">
          <ul>
            <router-link :to="{ path: '/goods' }" tag="li">商品</router-link>
            <router-link :to="{ path: '/ratings' }" tag="li">评价</router-link>
            <router-link :to="{ path: '/seller' }" tag="li">商家</router-link>
          </ul>
      </div>
      <div class="content">
        <keep-alive>
           <router-view></router-view>
         </keep-alive>
      </div>
  </div>
</template>

<script>

import HeaderCom from '@/components/header';

export default {
  components: {
    HeaderCom,
  },
  data(){
    return{

    }
  },
  created(){

  },
  mounted(){
    this.$http.get('../../../data.json')
    .then((data)=>{
      console.log(data);
    },(error)=>{
      console.log(error)
    })
  }
}
</script>

<style scoped="scoped">

.nav{
  height: 40px;
  width: 100%;
}
.nav ul{
  display: flex;
  border-bottom: 1px solid #e5e5e5;
}
.nav ul li{
  flex: 1;
  text-align: center;
  line-height: 40px;
  color: #5e656c;
  font-size: 14px;
}
.nav ul li.router-link-exact-active{
  color: #f01414;
}

</style>
