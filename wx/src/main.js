// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from './commons/axios';
import Toast from './commons/toast'
import './assets/style/index.scss';

Vue.config.productionTip = false
Toast.install(Vue);
Vue.prototype.$axios = axios;

Vue.prototype.getUrlkey = (url = window.location.href) => {
  var params = {},
    arr = url.split("?");
  if (arr.length <= 1) return params;
  arr = arr[1].split("&");
  for (var i = 0, l = arr.length; i < l; i++) {
    var a = arr[i].split("=");
    params[a[0]] = a[1];
  }
  return params;
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
