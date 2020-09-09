import Vue from 'vue'
import WaitPayResult from './waitPayResult.vue'
import router from '@/router'

Vue.config.productionTip = false
new Vue({
  render: h => h(WaitPayResult),
  router
}).$mount('#app')