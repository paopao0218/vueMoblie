<template lang="html">
  <div class="goodsDetail-wrapper" v-show='goodsDtailFlag'>
    <transition name='left'>
      <div class="goods-detail"  ref='goodsDetail'>
          <div class="goods-content-wrapper">
            <div class="goods-head-img">
              <img :src="food.image" alt="">
            </div>
            <div class="goods-back" @click='goodsBack'>
              <i class="icon-arrow_lift"></i>
            </div>
            <div class="goods-content">
                <h2 class="goods-content-title">{{food.name}}</h2>
                <div class="goods-content-number">
                  <span class="goods-content-sellCount">月售{{food.sellCount}}份</span>
                  <span class="goods-content-rating">好评率{{food.rating}}%</span>
                </div>
                <div class="goods-money-wrapper">
                  <span class="new-money">￥{{food.price}}</span>
                  <span class="old-money">￥{{food.oldPrice}}</span>
                </div>
                <div class="car-con-wrapper">
                  <shopCarCom :goods='food'></shopCarCom>
                </div>
                <div class="goods-add-car" @click='addCar' v-show="!food.count || food.count===0">加入购物车</div>
            </div>
            <splitCom></splitCom>
            <div class="info-wrapper" v-if='food.info'>
              <h2>商品介绍</h2>
              <p>{{food.info}}</p>
            </div>
            <splitCom></splitCom>
            <div class="rating-choose">
              <h3>商品评价</h3>
              <RatingsCom :selectType='selectType' :ratings='food.ratings' :ratType="ratType" :onlyContent='onlyContent' @checkedChoose='checkedChooseFn' @checkedContent='showMsg'></RatingsCom>
              <!-- 列表显示 -->
              <div class="rating-list-wrapper">
                  <ul v-show='food.ratings && food.ratings.length!=0'>
                    <li v-for='ratings in food.ratings' class='rating-list' v-show='listShow(ratings.rateType,ratings.text)' >
                        <div class="time-context">
                          <time>{{ratings.rateTime | formatDate}}</time>
                          <p>
                            <i :class="{'icon-thumb_up':ratings.rateType==1,'icon-thumb_down':ratings.rateType==0}"></i>
                            <span>{{ratings.text}}</span>
                          </p>
                        </div>
                        <div class="user-info">
                            <span>{{ratings.username}}</span>
                            <img :src="ratings.avatar" alt="">
                        </div>
                    </li>
                  </ul>
              </div>
              <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
            </div>
          </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue';
import BScroll from 'better-scroll';
import {formatDate} from '../../common/js/date';
import shopCarCom from '@/components/base/controlNumber';
import splitCom from '@/components/base/split';
import RatingCom from '@/components/base/rating';
import RatingsCom from '@/components/base/rating'

const ALL = 2;

export default {
  props:{
    food:{
      type:Object,
    }
  },
  components:{
    shopCarCom,
    splitCom,
    RatingsCom,
  },
  data(){
    return{
      goodsDtailFlag:false,
      ratType:{
        all: '全部',
        positive: '满意',
        negative: '不满意'
      },
      onlyContent:true,
      selectType:ALL,
    }
  },
  created(){

  },
  filters:{
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  methods:{
    show(){

      this.selectType=ALL;
      this.onlyContent=true;

      this.goodsDtailFlag=true;
      this.$nextTick(()=>{
        if(!this.scroll){
          this.scroll=new BScroll(this.$refs.goodsDetail,{
            click:true,
          })
        }else{
          this.scroll.refresh();
        }
      })
    },
    goodsBack(){
      this.goodsDtailFlag=false;
    },
    //加入购物车
    addCar(event){
      if (!event._constructed) {
        return;
      }
      Vue.set(this.food, 'count', 1);
    },
    showMsg(data){
      this.selectType=data;
    },
    checkedChooseFn(data){
      this.onlyContent = !this.onlyContent;
    },
    listShow(type,text){
      //展示切换 判断  属性是否存在 并且 不等于空内容
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    }
  }
}
</script>

<style lang="css" scoped="scoped">
  @import "../../common/css/style.css";
  .goodsDetail-wrapper{
    background: red;
    width: 100%;
    height: 100%;
  }
  .goods-detail{
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 58px;
    width: 100%;
    background: #fff;
  }
  /* 动画效果 */
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
  .goods-head-img{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
  }
  .goods-head-img img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .goods-back{
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 4;
  }
  .goods-back .icon-arrow_lift{
    display: block;
    font-size: 18px;
    color: #fff;
    padding: 10px;
  }
  .goods-content{
    padding: 18px;
    position: relative;
  }
  .goods-content-title{
    font-size: 16px;
    font-weight: 700;
    color: rgb(7,17,27);
    line-height: 14px;
    margin-bottom: 8px;
  }
  .goods-content-number{
    font-size: 10px;
    color: rgba(147, 153, 159, 1);
    line-height: 10px;
  }
  .goods-content-sellCount{
    margin-right: 12px;
  }
  .goods-money-wrapper{
    margin-top: 18px;
  }
  .new-money{
    font-size: 16px;
    font-weight: 700;
    color: rgba(240, 20, 20, 1);
  }
  .old-money{
    font-size: 12px;
    font-weight: 700;
    color: rgb(147, 153, 159);
    vertical-align: top;
  }
  .goods-add-car{
    text-align: center;
    height: 30px;
    line-height: 30px;
    color: #fff;
    font-size: 10px;
    padding: 0px 10px;
    background: rgb(0, 160, 220);
    border-radius: 18px;
    position: absolute;
    bottom: 18px;
    z-index: 5;
    box-sizing: border-box;
    right: 18px;
  }
  .car-con-wrapper{
    position: absolute;
    bottom: 20px;
    z-index: 5;
    box-sizing: border-box;
    right: 18px;
  }
  /* 商品介绍 */
  .info-wrapper{
    padding: 18px;
    background: #fff;
  }
  .info-wrapper h2{
    margin-bottom: 6px;
    color: #000;
    font-size: 18px;
  }
  .info-wrapper p{
    font-size: 12px;
    font-weight: 200;
    color: rgb(77, 85, 93);
    line-height: 24px;
  }
  .rating-choose{

  }
  .rating-choose h3{
    padding-top: 18px;
    padding-left: 18px;
    color: #000;
    font-size:16px;
  }

  /* 评论列表 */
  .rating-list-wrapper{
    padding: 12px 18px;
  }
  .rating-list{
    padding: 16px 0px;
    position: relative;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .time-context{

  }
  .time-context time{
    display: block;
    font-size: 10px;
    line-height: 12px;
    color: rgb(147, 153, 159);
  }
  .time-context p{

  }
  .time-context p i{
    font-size: 14px;
    color: #00a0dc;
    line-height: 24px;
    display: inline-block;

  }
  .time-context p i.icon-thumb_down{
    color: #b7bbbf;
  }
  .time-context p span{
    display:inline-block;
    color: rgb(147, 153, 159);
    line-height: 24px;
    font-size: 12px;
    vertical-align: top;
  }
  .user-info{
    position: absolute;
    right: 5px;
    top: 10px;
  }
  .user-info span{
    font-size: 10px;
    color: #a4a9ae;
    display: block;
    float: left;
    margin: 6px 4px 0px 0px;
  }
  .user-info img{
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
  .no-rating{
    padding: 0px 18px 18px 18px;
    font-size: 14px;
    color: #a4a9ae;
  }
</style>
