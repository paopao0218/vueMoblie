<template lang="html">
  <div class="rating-wrapper">
      <div class="select-wrapper">
          <div @click='selectFn(2,$event)' :class="{'active':selectType==2}">
              <span :class="{'activeColor':selectType==2}">{{ratType.all}}</span>
              <span :class="{'activeColor':selectType==2}">{{ratings.length}}</span>
          </div>
          <div class="" @click='selectFn(1,$event)' :class="{'active':selectType==1}">
              <span :class="{'activeColor':selectType==1}">{{ratType.positive}}</span>
              <span :class="{'activeColor':selectType==1}">{{positives.length}}</span>
          </div>
          <div class="activeC" @click='selectFn(0,$event)' :class="{'activeDIs':selectType==0}">
              <span :class="{'activeDIsColor':selectType==0}">{{ratType.negative}}</span>
              <span :class="{'activeDIsColor':selectType==0}">{{negtives.length}}</span>
          </div>
      </div>
      <div class="checkout-wrapper">
          <i class="icon-check_circle" @click='checkedFn' :class="{'on':onlyContent}"></i>
          <span>只看有内容的评价</span>
      </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
  props:{
    'ratings':{
      type:Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    ratType:{
      type:Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        };
      }
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
  },
  data(){
    return{

    }
  },
  computed:{
    positives(){
      return this.ratings.filter((ratings)=>{
        return ratings.rateType==POSITIVE;
      })
    },
    negtives(){
      return this.ratings.filter((ratings)=>{
        return ratings.rateType==NEGATIVE;
      })
    }
  },
  methods:{
    checkedFn(){
      this.onlyContent = !this.onlyContent;
      this.$emit('checkedContent',this.onlyContent);
    },
    selectFn(type,even){
      this.selectType=type;
      this.$emit('checkedContent',type);
    }
  }
}
</script>

<style lang="css" scoped="scoped">
  @import "../../common/css/style.css";
  .rating-wrapper{

  }
  .select-wrapper{
    margin:0px 18px;
    padding: 18px 0px;
    font-size: 0px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .select-wrapper div{
    display: inline-block;
    width: 60px;
    height: 34px;
    margin-right: 12px;
    background: #ccecf8;
    text-align: center;
  }
    .select-wrapper div.active{
      background: #00a0dc;
    }
    .select-wrapper div.active span.activeColor{
        color: #fff;
    }
    .select-wrapper div.activeC{
      background: rgba(77, 85, 93, 0.2);
    }
    .select-wrapper div.activeC.activeDIs{
      background: rgba(77, 85, 93,0.8);
      color: #fff;
    }
    .select-wrapper div.activeC.activeDIs span.activeDIsColor{
      color: #fff;
    }
  .select-wrapper div span{
    font-size: 14px;
    color:#555;
    line-height: 34px;
    text-align: center;
  }

  .select-wrapper div span:nth-child(2){
    font-size: 12px;
    margin-left: 2px;
  }
  .checkout-wrapper{
    padding: 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .icon-check_circle{
    font-size: 19px;
    color: #b7bbbf;
    display: block;
    float:left;
    margin:0px 4px;
  }
    .icon-check_circle.on{
      color: #00a0dc;
    }
  .checkout-wrapper span{
    color: #b7bbbf;
    font-size: 14px;
  }

</style>
