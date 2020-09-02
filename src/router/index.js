import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import PayAmount from '@/views/payAmount'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/payAmount',
    name: 'payAmount',
    component: PayAmount
  }]
})