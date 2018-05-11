<template lang="html">
  <div class="goods-wrapper">
    <div class="menu-wrapper" ref='meunScroll'>
      <ul class="meun-ul">
        <li class="menu-item"  v-for='(item,index) in goods' :class="{'currentClass':index===currentIndex}" @click='meunListClick(index,$event)'>
          <span class="meun-text">
            <span class="meun-img" v-if='item.type>0' :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref='foodsScroll'>
       <ul>
         <li class="item-list item-list-height" v-for='item in goods'>
           <h2 class="item-title">{{item.name}}</h2>
           <ol v-for='(itemCont,index) in item.foods' class="border-bottom-color">
             <li class="item-context">
               <div class="icon-img">
                 <img :src="itemCont.icon" alt="" width="57px" height="57px">
               </div>
               <div class="cont-text">
                  <h3 class="cont-text-title">{{itemCont.name}}</h3>
                  <span class="cont-text-dirc" v-if='itemCont.description'>{{itemCont.description}}</span>
                  <div class="cont-text-number">
                    <span class="sellCount">月售{{itemCont.sellCount}}份</span>
                    <span class="rating">好评率{{itemCont.rating}}%</span>
                  </div>
                  <div class="cont-text-pirce">
                    <span class="price-new" >￥{{itemCont.price}}</span>
                    <span class="price-old" v-if='itemCont.oldPrice'>￥{{itemCont.oldPrice}}</span>
                  </div>
                  <div class="control-wrapper">
                    <controlNumberCom :goods="itemCont"></controlNumberCom>
                  </div>
               </div>
             </li>
           </ol>
         </li>
       </ul>
    </div>
    <div class="shopCar-wrapper">
        <shop-car-com :sellerObj='sellerObj' :selectFoods='selectFoods'></shop-car-com>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import shopCarCom from '@/components/base/shopCar';
import controlNumberCom from '@/components/base/controlNumber';
export default {
  props:{
    sellerObj:{
      type:Object,
    },
  },
  components:{
    shopCarCom,
    controlNumberCom,
  },
  data(){
    return{
      goods:[],
      heightArray:[],
      scrollY:0,
      goodsCount:'',
    }
  },
  computed:{
    currentIndex(){
      //循环 li 的高度  给当前的滚动  加class
      for(let i=0;i<this.heightArray.length;i++){
        let currentHeight_1=this.heightArray[i];
        let currentHeight_2=this.heightArray[i+1];
         if(!currentHeight_2 || (this.scrollY>=currentHeight_1 && this.scrollY<currentHeight_2)){
            return i;
         }
      }
      return 0;
    },

  },
  created(){
      this.classMap=['decrease','discount','guarantee','invoice','special'];
      this.$http.get('../../static/mock/data.json').then((res)=>{
        var resData=JSON.parse(res.bodyText);
        this.goods=resData.goods;
        //DOM 更新，或者说某些属性改变的时候
        this.$nextTick(()=>{
          this._foodsScroll();
          //组件属性改变完成时候 调用
          this.ListHeight();
        })
      },(error)=>{
          console.log('goos,请求错误')
      })
  },
  methods:{
    meunListClick(index,event){
      let itemListHeight=this.$refs.foodsScroll.getElementsByClassName('item-list-height');//获取 li
      this.foodsScrollFn.scrollToElement(itemListHeight[index],300)
    },
    _foodsScroll(){
      this.meunScrollFn=new BScroll(this.$refs.meunScroll,{
        click:true,
      });
      this.foodsScrollFn=new BScroll(this.$refs.foodsScroll,{
              probeType:3,
              click:true,
            });
      this.foodsScrollFn.on('scroll',(pos)=>{
        this.scrollY=Math.abs(Math.round(pos.y));
      })
    },
    ListHeight(){
      //获取每个li的高度
      let itemListHeight=this.$refs.foodsScroll.getElementsByClassName('item-list-height');//获取 li
      itemListHeight;
      itemListHeight.length;
      let height=0;
      this.heightArray.push(height);
      for(let i=0;i<itemListHeight.length;i++){
        let everyLi=itemListHeight[i];
        height+=everyLi.clientHeight;
        this.heightArray.push(height);
      }
    },
    selectFoods(){
      let goods=[];
      this.goods.forEach((item,index)=>{
          item.foods.forEach((foods,idx)=>{
            if(foods.count){
              goods.push(foods)
            }
          })
      })
      return goods;
    }
  },
}
</script>

<style lang="css">

.goods-wrapper{
  position: absolute;
  top: 199px;
  width: 100%;
  bottom: 58px;
  display: flex;
  overflow: hidden;
}
.menu-wrapper{
  flex: 0 0 80px;
  background: #f3f5f7;
}
.meun-ul{

}
.menu-item{
  height: 54px;
  width: 56px;
  line-height: 14px;
  padding: 0 10px;
  border-bottom: 1px solid #dbdee1;
  display: table;
}
.menu-item.currentClass{
  position: relative;
  background: #fff;
  border-bottom: 1px solid #fff;
  font-weight: 400;
  color: #07111b;
}
.meun-img{
  display: inline-block;
  float:left;
  width: 13px;
  height: 13px;
  background-repeat: no-repeat;
  background-size: 13px 13px;
  margin-right: 4px;
}
.meun-img.decrease{
  background: url('../../../static/imgs/header/decrease_3@2x.png');
  background-size: 13px 13px;
}
.meun-img.discount{
  background: url('../../../static/imgs/header/discount_3@2x.png');
  background-size: 13px 13px;
}
.meun-img.guarantee{
  background: url('../../../static/imgs/header/guarantee_3@2x.png');
  background-size: 13px 13px;
}
.meun-img.invoice{
  background: url('../../../static/imgs/header/invoice_3@2x.png');
  background-size: 13px 13px;
}
.meun-img.special{
  background: url('../../../static/imgs/header/special_3@2x.png');
  background-size: 13px 13px;
}
.meun-text{
  font-size: 13px;
  color: #07111b;
  vertical-align: middle;
  display: table-cell;
}
.foods-wrapper{
  flex: 1;
}
.number-wrapper{
    color: #fff;
}
.icon-img{
  margin-right: 8px;
}
.item-list{

}
.item-title{
  background-color: #f3f5f7;
  color: #a2a7ac;
  font-size: 12px;
  padding-left: 14px;
  height: 30px;
  line-height: 30px;
  border-left: 2px solid #d9dde1;
}
.border-bottom-color{
  margin: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid #d9dde1;
}
.border-bottom-color:last-child{
  border-bottom: none;
}
.item-context{
  display: flex;
  position: relative;
}
.cont-text{

}
.cont-text-title{
  font-size: 14px;
  color: rgb(7, 17, 27);
  line-height: 14px;
  margin: 2px 0px 3px 0px;
}
.cont-text-dirc{
  font-size: 10px;
  color: rgb(147, 153, 159);
  line-height: 10px;
  margin: 0px 0px 8px 0px;
}
.cont-text-number{
  font-size: 10px;
  color: rgb(147, 153, 159);
  line-height: 10px;
  margin: 4px 0px 8px 0px;
}
.price-new{
  font-size: 14px;
  color: #f01414;
  font-weight: 700;
  line-height: 14px;
  margin: 0px 8px 0px 0px;
}
.price-old{
  font-size: 10px;
  color: rgba(147, 153, 159, 1);
  font-weight: 700;
}
.control-wrapper{
  position: absolute;
  right: 0px;
  bottom: 0px;
  z-index: 11;
}
.shopCar-wrapper{
  position: fixed;
  bottom: 0px;
  left: 0px;
  height: 58px;
  background: #141d27;
  z-index: 2;
  width: 100%;
}
.control-wrapper{

}
</style>
