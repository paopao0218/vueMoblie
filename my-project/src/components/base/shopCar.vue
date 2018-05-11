<template lang="html">
  <div class="shop">
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
        <span class='shopping-span' :class="payClass" @click.stop.preventDefault='goPay'>{{deisMoney}}</span>
      </div>
    </div>
    <transition name='fade'>
    <div class="shopcart-list" v-show='carList'>
        <div class="shopcar-header">
          <h1>购物车</h1>
          <span @click="empty">清空</span>
        </div>
        <!-- 显示和隐藏和总价值有关系的 -->
        <div class="shopcar-context" ref='shopcarContextScroll'>
            <ul>
              <li v-for='(itemCont,index) in selectFoods()' class="shopcar-li">
                <div class="foods-name">{{itemCont.name}}</div>
                <div class="foods-price">￥{{itemCont.count*itemCont.price}}</div>
                <div class="foods-control">
                  <controlNumberCom :goods='selectFoods()'></controlNumberCom>
                </div>
              </li>
            </ul>
        </div>
    </div>
    </transition>
  </div>

</template>

<script>
import controlNumberCom from '@/components/base/controlNumber';
import BScroll from 'better-scroll';
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
      fold:true,
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
    // 去结算
    payClass() {
      if (this.totalFn < this.sellerObj.minPrice) {
        return 'not-enough';
      } else {
        return 'enough';
      }
    },
    carList(){
      if(!this.totalFn){
          this.fold=true;
          return false;
      }
      let show=!this.fold;
      if(show){
        this.$nextTick(()=>{
          if(!this.scroll){
            console.log(this.$refs.shopcarContextScroll)
            this.scroll=new BScroll(this.$refs.shopcarContextScroll,{
              click:true,
            })
          }else{
            this.scroll.refresh();
          }
        })
      }
      return show;
    },
  },
  methods:{
    shopCarList(){
      if(!this.totalFn){
        this.fold=true;
        return false;
      }else{
        this.fold=!this.fold;
      }
    },
    empty(){
      console.log("1")
      let foods=this.selectFoods();
      foods.forEach((item)=>{
        item.count=0;
      })
    },
    goPay(){
      if (this.totalFn < this.sellerObj.minPrice) {
        return false;
      }
      window.alert(`去结算${this.totalFn}`);
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
    background: #fff;
    bottom: 0px;
    left: 0px;
    z-index: 4;
  }
    .shopcar-header{
      width: 100%;
      padding: 0px 40px;
      height: 40px;
      background: #f3f5f7;
      box-sizing: border-box;
      border-bottom: 1px solid #dbdee1;
    }
      .shopcar-header h1{
        color: rgb(7,17,27);
        font-size: 14px;
        line-height: 24px;
        padding: 12px 0px;
        display: block;
        float: left;
      }
      .shopcar-header span{
        display: block;
        float: right;
        font-size: 12px;
        line-height: 40px;
        color: rgb(0, 160, 220);
      }
.shopcar-context{
  clear: both;
  max-height: 120px;
  overflow: hidden;
}
  .shopcar-context ul{
    padding: 0px 40px;
    box-sizing: border-box;
  }
    .shopcar-li{
      width: 100%;
      height: 44px;
      padding: 12px 0px;
      border-bottom: 1px solid #dbdee1;
      color: #07111b;
      position: relative;
      box-sizing: border-box;
    }
    .foods-name{
      display: block;
      font-size: 14px;
      line-height: 24px;
      color: #07111b;
      float: left;
    }
    .foods-price{
      position: absolute;
      right: 80px;
      top: 20px;
    }
    .foods-control{
      float: right;
      margin-top: 4px;
    }


    .fade-enter-active, .fade-leave-active {
      transition: all .5s;

    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      transform: translateY(100px);
      opacity: 0;
    }
</style>
