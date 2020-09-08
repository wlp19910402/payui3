import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import PayAmount from '@/views/payAmount'
import NotFount from '@/views/404'
import Test from '@/views/test'
Vue.use(Router)
export default new Router({
  mode: "history",
  base: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_SRC : '/',
  routes: [{
    path: '/',
    name: 'PayAmount',
    component: PayAmount
  }, {
    path: '/payAmount',
    name: 'Home',
    component: Home
  }, {
    path: '/test',
    name: 'test',
    component: Test
  }, {
    path: '*',
    name: '404',
    component: NotFount
  }]
})