<template lang="html">
  <!-- header -->
  <div class="header">
      <!-- 头部内容 -->
      <div class="header-top-wp">
          <div class="logo-wrapper">
              <img :src="sellerObj.avatar" alt="">
          </div>
          <div class="header-top-cont">
              <div class="header-top-title">
                <span></span>
                <h3>{{sellerObj.name}}</h3>
              </div>
              <div class="header-cont-description">
                  {{sellerObj.description}}/{{sellerObj.deliveryTime}}到达
              </div>
              <div class="header-cont-supports" v-if='sellerObj.supports'>
                <span :class="classMap[sellerObj.supports[0].type]"></span>
                <p>{{sellerObj.supports[0].description}}</p>
              </div>
          </div>
          <div class="supports-cont" v-if='sellerObj.supports' @click='detailsClick'>
              <span>{{sellerObj.supports.length}}个</span>
              <i class="icon-keyboard_arrow_right"></i>
          </div>
      </div>
      <!-- 公告部分 -->
      <div class="header-bulletin"  @click='detailsClick'>
         <span class="bulletin-title"></span>
         <div class="bulletin-con">
           {{sellerObj.bulletin}}
         </div>
         <i class="icon-keyboard_arrow_right bulleti-go"></i>
      </div>
      <!-- 背景图片 -->
      <div class="backgroundImg">
        <img :src="sellerObj.avatar" alt="">
      </div>
      <!-- 弹框内容 涉及一个新的布局方式 -->
      <transition name='fade'>
        <div class="layer-wp" v-show='detailShow'>
            <div class="layer-main-wp">
              <div class="layer-main">
                <h3 class="name">{{sellerObj.name}}</h3>
                <div class="star-wrapper">
                  <StarCom :score='sellerObj.score'></StarCom>
                </div>
                <div class="title">
                  <div class="line"></div>
                  <div class="text">
                    优惠信息
                  </div>
                  <div class="line"></div>
                </div>
                <div class="supports-mask" v-if='sellerObj.supports'>
                    <div class="" v-for='(item,index) in sellerObj.supports' class="header-cont-supports">
                      <span :class="classMap[sellerObj.supports[index].type]"></span>
                      <p>{{sellerObj.supports[index].description}}</p>
                    </div>
                </div>
                <div class="title">
                  <div class="line"></div>
                  <div class="text">
                    商家公告
                  </div>
                  <div class="line"></div>
                </div>
                <div class="bulletin-wp">
                    {{sellerObj.bulletin}}
                </div>
              </div>
            </div>
            <div class="layer-close-wp">
                <i class="icon-close" @click='closeDetail'></i>
            </div>
        </div>
      </transition>
  </div>
</template>

<script>
import StarCom from '@/components/base/star';
export default {
  components:{
    StarCom,
  },
  props:{
    sellerObj:{
      type:Object
    }
  },
  data(){
    return{
       seller:{},
       detailShow:false,
    }
  },
  created(){
    this.classMap=['decrease','discount','guarantee','invoice','special'];
  },
  methods:{
    detailsClick(){
      this.detailShow=true;
    },
    closeDetail(){
        this.detailShow=false;
    }
  },
  conputed(){

  },
}
</script>

<style lang="css" scoped="scoped">
  @import "../common/css/style.css";
  .header{
    width: 100%;
    background: rgba(7,17,27,0.5);
    color: #fff;
    position: relative;
    overflow: hidden;
  }
  .header-top-wp{
    height:106px;
    padding: 24px 24px 0px 24px;
    font-size: 0px;
  }
  .logo-wrapper{
    display: block;
    width: 64px;
    height: 64px;
    float: left;
  }
  .logo-wrapper img{
    display: block;
    width: 64px;
    height: 64px;
    border-radius: 4px;
  }
  .header-top-cont{
    display: block;
    float: left;
  }
  .header-top-title{
    margin-left: 16px;
    vertical-align: top;
  }
  .header-top-title span{
    display: inline-block;
    margin-top: 2px;
    margin-bottom: 8px;
    width: 30px;
    height: 18px;
    background: url('../../static/imgs/header/brand@2x.png') no-repeat;
    background-size: 100%;
    margin-right: 10px;
  }
  .header-top-title h3{
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    line-height: 16px;
    display: inline-block;
    vertical-align: top;
  }
  .header-cont-description{
    font-size: 14px;
    color: #fff;
    margin-left: 16px;
  }
  .header-cont-supports{
    margin-left: 16px;
    color: #fff;
    font-size: 10px;
    font-weight: 200px;
    margin-top: 9px;
  }
  .header-cont-supports span{
    display: block;
    float:left;
    width: 13px;
    height: 13px;
    margin-right: 4px;
    background-repeat: no-repeat;
    background-size: 13px 13px;
  }
  .header-cont-supports span.decrease{
    background: url('../../static/imgs/header/decrease_3@2x.png');
    background-size: 13px 13px;
  }
  .header-cont-supports span.discount{
    background: url('../../static/imgs/header/discount_3@2x.png');
    background-size: 13px 13px;
  }
  .header-cont-supports span.guarantee{
    background: url('../../static/imgs/header/guarantee_3@2x.png');
    background-size: 13px 13px;
  }
  .header-cont-supports span.invoice{
    background: url('../../static/imgs/header/invoice_3@2x.png');
    background-size: 13px 13px;
  }
  .header-cont-supports span.special{
    background: url('../../static/imgs/header/special_3@2x.png');
    background-size: 13px 13px;
  }
  .supports-cont{
    float: right;
    background: #4d5055;
    width: 44px;
    height: 24px;
    position: relative;
    color: #fff;
    line-height: 24px;
    border-radius: 4px;
    margin-top: 38px;
  }
  .supports-cont span{
    display: block;
    color: #fff;
    font-size: 10px;
    margin-left: 2px;
    text-align: center;
    margin-right: 14px;
  }
  .supports-cont i{
    color: #fff;
    font-size: 20px;
    position: absolute;
    right: 0px;
    top: 2px;
  }
  .header-bulletin{
    height: 28px;
    padding: 0px 12px;
    color: #fff;
    font-size: 10px;
    background-color: rgba(7, 17, 27, 0.2);
  }
  .bulletin-title{
    display: block;
    float:left;
    width: 22px;
    height: 12px;
    background: url("../../static/imgs/header/bulletin@2x.png") no-repeat;
    background-size: contain;
    margin-top: 8px
  }
  .bulletin-con{
    margin-left: 25px;
    overflow: hidden;
    white-space: nowrap;
    float: left;
    width: 80%;
    text-overflow:ellipsis;
    margin-top: 8px
  }
  .bulleti-go{
    display: block;
    float: left;
    margin-left: 10px;
    margin-top: 8px;
  }
  .backgroundImg{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top:0px;
    filter: blur(10px);
    z-index: -1
  }
  .backgroundImg img{
    display: block;
    width: 100%;
    height: 100%;
  }

  .layer-wp{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(7,17,27,0.8);
    z-index: 8;
    overflow: auto;
  }
  .layer-main-wp{
    min-height: 100%;
  }
  .layer-main-wp::after{
    content: '.';
    display:block;;
    width: 0px;
    height: 0px;
    clear: both;
    font-size: 0px;
  }
  .layer-main{
    padding-top: 64px;
    padding-bottom: 64px;
  }
  .layer-main .name{
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
  }
  .layer-close-wp{
    position: relative;
    margin: -64px auto 0 auto;
    clear: both;
    font-size: 32px;
    width: 32px;
    height: 32px;
  }
  .star-wrapper{
    width: 120px;
    margin:0 auto;
    margin-top: 16px;
    line-height: 16px;
  }
  .layer-main .title{
    display: flex;
    margin: 28px 32px 24px 32px;
  }
  .layer-main .title div{
      flex: 1;
  }
  .layer-main .title div.line{
    height: 0px;
    border-bottom: 1px solid #61676d;
    margin-top: 8px
  }
  .layer-main .title div.text{
    text-align: center;
  }
  .supports-mask{
    margin-left: 28px;
  }
  .supports-mask .header-cont-supports p{
    font-size: 14px;
  }
  .supports-mask .header-cont-supports span{
    font-size: 14px;
    margin-right: 14px;
  }
  .bulletin-wp{
    width: 80%;
    margin: 0 auto;
    line-height: 25px;
    font-size: 13px;
    color: #fff;
    font-weight: 200;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

</style>
