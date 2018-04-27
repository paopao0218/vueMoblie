import Vue from 'vue';
import VueRouter from 'vue-router';

import goodsCom from '@/components/content/goods';
import ratingsCom from '@/components/content/ratings';
import sellerCom from '@/components/content/seller';

Vue.use(VueRouter);

export default new VueRouter({
   mode:'history',
   routes:[
     {
       path:'/goods',
       component:goodsCom,
     },
     {
       path:'/ratings',
       component:ratingsCom
     },{
       path:'/seller',
       component:sellerCom
     }
   ]
})
