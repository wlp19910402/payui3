import Vue from 'vue'
import PayAmount from './payAmount.vue'
import router from '@/router'

Vue.config.productionTip = false
new Vue({
  render: h => h(PayAmount),
  router
}).$mount('#app')