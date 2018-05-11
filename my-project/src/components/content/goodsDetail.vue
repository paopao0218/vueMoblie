<template lang="html">
  <div class="goodsDetail-wrapper">
    <transition name='left'>
      <div class="goods-detail" v-show='goodsDtailFlag'>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props:{
    selectGoods:{
      type:Object,
    }
  },
  data(){
    return{
      goodsDtailFlag:false,
    }
  },
  methods:{
    show(){
      this.goodsDtailFlag=true;
    }
  }
}
</script>

<style lang="css" scoped="scoped">
  .goods-detail{
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 58px;
    width: 100%;
    background: #fff;
  }
.left-enter-active {
  transition: all 0.5s ease;
}
.left-leave-active {
  transition: all 0.5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.left-enter, .left-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}
</style>
