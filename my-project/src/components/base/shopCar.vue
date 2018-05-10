<template lang="html">
  <div class="shopCar-wrapper">
    <div class="shopCar-left">

        <div class="shopping-car-wrapper">
            <div class="number-wrapper" v-if='totleFn>0'>
              {{Orders.number}}
            </div>
            <div class="icon-img-wrapper" :class="{'bg':totleFn>0}">
                <i class="icon-shopping_cart" :class="{'fff':totleFn>0}"></i>
            </div>
        </div>
        <div class="price-wrapper">
            <!-- <span>￥{{Orders[0].number}}</span> -->
            <span class="colorCC" :class="{'colorWith':totleFn>0}">￥{{totleFn}}</span>
        </div>
        <div class="other-wrapper">
            <span>{{needPrice}}</span>
        </div>
    </div>
    <div class="shopCar-right">
      <span class='shopping-span' :class="{'goShopping':minSend=='去结算'}">{{minSend}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    sellerObj:{
      type:Object
    },
    Orders:{
      // type:Array,
    }
  },
  data(){
    return{
      totle:0,
    }
  },
  computed:{
    //计算总价
    totleFn(){
      let totles=this.Orders.price*this.Orders.number;
      Math.random(totles);
      // return totles
      // this.totle=10;
      return totles;
    },
    //判断是否需要配送费
    needPrice(){
      let needMoney=0;
      let moanye=this.sellerObj.minPrice-this.totleFn;
      if(moanye>0){
        needMoney=`另需要配送费${this.sellerObj.deliveryPrice}元`
      }else if(moanye===0){
        needMoney=`另需要配送费0元`
      }
      return needMoney;
    },
    //还差多少元起送
    minSend(){
      let needpirce=0;
      let remaining=this.sellerObj.minPrice-this.totleFn;
      if(remaining>0){
        needpirce=`还差￥${remaining}起送`
      }else if(remaining===0){
        needpirce='去结算'
      }else {
        needpirce='去结算'
      }
      return needpirce;
    },
  }
}
</script>

<style lang="css" scoped="scoped">
@import "../../common/css/style.css";
.shopCar-wrapper{
  display: flex;
  height: 58px;
}
.shopCar-left{
  flex: 1;
  font-size: 0px;
}

  .shopping-car-wrapper{
    float: left;
    display: inline-block;
    width: 58px;
    height: 58px;
    border-radius: 50%;
    position: relative;
    bottom: 10px;
    margin: 0px 0px 0px 10px;
    background: #141d27;
    padding: 6px;
    box-sizing: border-box;
  }
    .number-wrapper{
      position: absolute;
      right: -6px;
      top: -4px;
      color: #fff;
      z-index: 20;
      background: red;
      height: 18px;
      font-size: 12px;
      border-radius: 8px;
      text-align: center;
      line-height: 18px;
      padding: 0px 10px;
    }
    .icon-img-wrapper{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #2b343c;
      text-align: center;
    }
      .icon-img-wrapper.bg{
        background: rgb(0,160,220);
      }
      .icon-img-wrapper .icon-shopping_cart{
        font-size: 24px;
        color: #80858a;
        line-height: 43px
      }
      .icon-img-wrapper .icon-shopping_cart.fff{
        color: #fff;
      }
  .price-wrapper{
    display: inline-block;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    border-right: 1px solid #2c343d;
    margin-top: 20px;
    padding-right: 12px;
    color: #919396;
    float: left;
  }
    .price-wrapper .colorCC{
      font-weight: bold;
      font-size:20px;
    }
    .price-wrapper .colorCC.colorWith{
      color: #fff;
    }
  .other-wrapper{
    float: left;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    margin-top: 18px;
    padding-right: 12px;
    color: #919396;
    margin-left: 10px;
  }
    .other-wrapper span{
      color: #919396;
      font-size: 16px;
    }

.shopCar-right{
  flex: 0 0 105px;
  background: #2b333b;
}
  .shopCar-right .shopping-span{
    text-align: center;
    color: #919396;
    display: block;
    line-height: 58px;
    font-weight: bold;
    font-size: 15px;
  }
  .shopCar-right .shopping-span.goShopping{
    background: green;
    color: #fff;
  }
</style>
