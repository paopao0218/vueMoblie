<template lang="html">
  <div class="star-wrapper">
    <span class="star-items" v-for='(itemclass,index) in itemClasses' :class="itemclass"></span>
  </div>
</template>

<script>
  const SIZESTAR=5;
export default {
  props:{
    score:{
      type:Number,//星星显示的个数  父组件直接传递
    }
  },
  watch:{

  },
  data(){
    return{

    }
  },
  methods:{

  },
  computed:{
    itemClasses(){
      let arrs=[];
      let score=Math.floor(this.score*2)/2;//整数
      let decimal=score % 1  !== 0 ; //半颗星星.5 一颗星是0
      let Inerger=Math.floor(score);
      for(let i=0; i< Inerger; i++){
        arrs.push('on');
      }
      if(decimal){
        arrs.push('half');
      }
      while(arrs.length < SIZESTAR){
        arrs.push('off');
      }
      return arrs;
    }
  },
  created(){

  },
}
</script>

<style lang="css" scoped="scoped">
  /* 通过传递过来的size来判断显示几颗星星 */
  /* 通过传递过来的score来判断星星显示几个数字 */
  .star-wrapper{
    height: 22px;
  }
  .star-items{
    display: inline-block;
    width: 22px;
    height: 22px;
  }
  .star-items.half{
    background: url('../../../static/imgs/star/star24_half@2x.png') no-repeat;
  }
  .star-items.on{
    background: url('../../../static/imgs/star/star24_on@2x.png') no-repeat;
  }
  .star-items.off{
    background: url('../../../static/imgs/star/star24_off@2x.png') no-repeat;
  }

</style>
