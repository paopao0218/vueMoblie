// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/pages/index';
import router from './router';
import resource from 'vue-resource';


Vue.config.productionTip = false;

Vue.use(resource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  resource,
  components: { App },
  template: '<App/>'
})
