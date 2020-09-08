import Vue from 'vue'
import Router from 'vue-router'
import WaitPayResult from '@/views/waitPayResult'
import PayAmount from '@/views/payAmount'
import NotFount from '@/views/error/404'
Vue.use(Router)
export default new Router({
  mode: "history",
  base: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_SRC : '/',
  routes: [{
    path: '/:merId/:termId/payAmount',
    name: 'PayAmount',
    component: PayAmount
  }, {
    path: '/:merId/:termId/order/waitPayResult/:orderId',
    name: 'WaitPayResult',
    component: WaitPayResult
  }, {
    path: '*',
    name: '404',
    component: NotFount
  }]
})