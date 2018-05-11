<template lang="html">
  <div class="shopCar-wrapper" @click='shopCarList'>
    <div class="shopCar-left">
        <div class="shopping-car-wrapper">
            <div class="number-wrapper" v-if="totalCarNumber>0">
              {{totalCarNumber}}
            </div>
            <div class="icon-img-wrapper" :class="{'bg':totalCarNumber>0}">
                <i class="icon-shopping_cart" :class="{'fff':totalCarNumber>0}"></i>
            </div>
        </div>
        <div class="price-wrapper">
            <span class="colorCC" :class="{'colorWith':totalCarNumber>0}">￥{{totalFn}}</span>
        </div>
        <div class="other-wrapper">
            <span v-if='sellerObj.deliveryPrice'>另需配送费￥{{sellerObj.deliveryPrice}}元</span>
        </div>
    </div>
    <div class="shopCar-right">
      <span class='shopping-span' :class="payClass">{{deisMoney}}</span>
    </div>
    <div class="shopcart-list" v-show='carList'>
        <div class="shopcar-header">
          <h1>购物车</h1>
          <span>清空</span>
        </div>
        <!-- 显示和隐藏和总价值有关系的 -->
        <div class="shopcar-context">
            <ul>
              <li v-for='foods in selectFoods()' class="shopcar-li">
                <div class="foods-name">{{foods.name}}</div>
                <div class="foods-price">{{foods.count*foods.price}}</div>
                <div class="foods-control">
                    <controlNumberCom></controlNumberCom>
                </div>
              </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
import controlNumberCom from '@/components/base/controlNumber';
export default {
  props:{
    sellerObj:{
      type:Object
    },
    selectFoods: {
      type:Function
    },
    minPrice:{
      type:Number,
    }
  },
  components:{
    controlNumberCom,
  },
  data(){
    return{
      totle:0,
      carList:false,
    }
  },
  created(){
    this.selectFoods();
  },
  computed:{
    //计算总价
    totalFn(){
      let selectFoods=this.selectFoods(),
          total=0;
      selectFoods.forEach((item)=>{
        total+=item.count*item.price;
      })
      return total;
    },
    //购物车数量
    totalCarNumber(){
      let selectFoods=this.selectFoods(),
          carNumber=0;
      selectFoods.forEach((item)=>{
          carNumber+=item.count;
      })
      return carNumber;
    },
    //还差多少元
    deisMoney(){
      let selectFoods=this.selectFoods();
        if(this.totalFn<this.sellerObj.minPrice){
          let diesM=this.sellerObj.minPrice-this.totalFn;
          return `还差￥${diesM}元起送`;
        }else if(this.totalFn===0){
            return `￥${this.sellerObj.minPrice}元起送`;
        }else {
          return '去结算';
        }
    },
    payClass() {
      if (this.totalFn < this.sellerObj.minPrice) {
        return 'not-enough';
      } else {
        return 'enough';
      }
    },
  },
  methods:{
    shopCarList(){
      if(!this.totalFn){
        this.carList=false;
      }else{
        this.carList=!this.carList;
      }
    }
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
  .shopCar-right .shopping-span.not-enough{
    text-align: center;
    color: #919396;
    display: block;
    line-height: 58px;
    font-weight: bold;
    font-size: 15px;
  }
  .shopCar-right .shopping-span.enough{
    background: green;
    color: #fff;
  }


  .shopcart-list{
    position: absolute;
    width: 100%;
    background: red;
  }
    .shopcar-li{

    }
</style>
