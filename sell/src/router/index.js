import Vue from 'vue';
import vueRouter from 'vue-router';

import HeaderPath from '@/components/header/header';

Vue.use(vueRouter);

export default new vueRouter({
      mode:'history',
      routes:[
        {
          path:'/HeaderPath',
          name:HeaderPath,
          components:HeaderPath
        },
      ]
  })
