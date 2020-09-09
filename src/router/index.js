import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/index.vue'
import NotFount from '@/views/error/404'
import PayAmount from '@/payAmount/payAmount'
import WaitPayResult from '@/waitPayResult/waitPayResult'

Vue.use(Router)
export default new Router({
  mode: "history",
  base: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_SRC : '/',
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/payAmount',
    name: 'PayAmount',
    component: PayAmount
  }, {
    path: '*',
    name: '404',
    component: NotFount
  },
{
    path: '/waitPayResult',
    name: 'waitPayResult',
    component: WaitPayResult
  }, ]
})