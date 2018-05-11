<template lang="html">
  <div class="control-number">
    <transition name="fade">
      <div class="control-dersc" v-show='goods.count>0' @click="dirceNumberFn">
        <span class="icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="control-context" v-show='goods.count>0'>{{goods.count}}</div>
    <div class="control-add" v-if='' @click='addNumberFn($event)'>
      <span class="icon-add_circle"></span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

//如果父级元素没有这个属性，可以通过set方法去定义属性
export default {
  props:{
    goods:{
      // type:Object,
    },
  },
  data(){
    return{

    }
  },
  created(){
    Vue.set(this.goods,'count',0);
  },
  methods:{
    addNumberFn(event){
      if(!this.goods.count){
        Vue.set(this.goods,'count',1);
      }else {
        this.goods.count++;
      }
    },
    dirceNumberFn(){
      this.goods.count--;
    }
  }
}
</script>

<style lang="css" scoped="scoped">
@import "../../common/css/style.css";
.control-number{
  font-size: 0px;
}
.control-dersc{
  font-size: 24px;
  color: #00a0dc;
  display: inline-block;
}
.control-dersc span{
  font-size: 24px;
  color: #00a0dc;
  display: inline-block;
}
.control-context{
  font-size: 14px;
  color: #93999f;
  line-height: 24px;
  display: inline-block;
  padding: 0px 4px;
  vertical-align: top;
}
.control-add{
  font-size: 24px;
  color: #00a0dc;
  display: inline-block;
}


.fade-enter-active, .fade-leave-active {
  transition: all .2s linear;
  opacity: 1;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(20px) ;
  opacity: 0;
}


</style>
