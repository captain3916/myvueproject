// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import 'mint-ui/lib/style.css';
import App from './App';
import router from './router';
import Url from './router/apiRouter';
import store from './store';

Vue.prototype.$axios = axios;
Vue.prototype.$URL = Url;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App></App>',
});
