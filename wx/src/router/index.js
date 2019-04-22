import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'index',
    component: resolve => require(['../pages/index.vue'], resolve)
  },
  {
    path: '/demand_index',
    name: 'demandIndex',
    component: resolve => require(['../pages/demand_index.vue'], resolve)
  },
  {
    path: '/myself',
    name: 'myself',
    component: resolve => require(['../pages/myself.vue'], resolve)
  },
  {
    path: '/myInfo',
    name: 'myInfo',
    component: resolve => require(['../pages/myInfo.vue'], resolve)
  },
  {
    path: '/myFeedback',
    name: 'myFeedback',
    component: resolve => require(['../pages/myFeedback.vue'], resolve)
  },
  {
    path: '/myDemand',
    name: 'myDemand',
    component: resolve => require(['../pages/myDemand.vue'], resolve)
  },
  {
    path: '/myService',
    name: 'myService',
    component: resolve => require(['../pages/myService.vue'], resolve)
  },
  {
    path: '/reservationList',
    name: 'reservationList',
    component: resolve => require(['../pages/reservation_list.vue'], resolve)
  },
  {
    path: '/newsList',
    name: 'newsList',
    component: resolve => require(['../pages/news_list.vue'], resolve)
  },
  {
    path: '/newsDetail',
    name: 'newsDetail',
    component: resolve => require(['../pages/news_detail.vue'], resolve)
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: resolve => require(['../pages/feedback.vue'], resolve)
  },
  {
    path: '/fillInfo',
    name: 'fillInfo',
    component: resolve => require(['../pages/fillInfo.vue'], resolve)
  },
  {
    path: '/demand',
    name: 'demand',
    component: resolve => require(['../pages/demand.vue'], resolve)
  },
  {
    path: '/service',
    name: 'service',
    component: resolve => require(['../pages/service.vue'], resolve)
  },
  {
    path: '/modifyInfo',
    name: 'modifyInfo',
    component: resolve => require(['../pages/modify_info.vue'], resolve)
  }
  ]
});
export default router;