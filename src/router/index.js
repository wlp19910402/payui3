import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import PayAmount from '@/views/payAmount'
import NotFount from '@/views/404'
Vue.use(Router)
export default new Router({
  mode: "history",
  base: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_SRC : '/',
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/payAmount',
    name: 'payAmount',
    component: PayAmount
  }, {
    path: '*',
    name: '404',
    component: NotFount
  }]
})