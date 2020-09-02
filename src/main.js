import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import MandMobile from 'mand-mobile/lib/mand-mobile.esm'

// Vue.use(MandMobile)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  // MandMobile,
  router
}).$mount('#app')