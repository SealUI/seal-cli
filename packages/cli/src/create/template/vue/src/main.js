import Vue from 'vue'
import 'static/styles/base.scss'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false
Vue.config.errorHandler = function(err, vm, info) {
  console.error(`[Error Message]: \n${err.toString()}\nInfo: ${info}`)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
if (module.hot) {
  module.hot.accept()
}
