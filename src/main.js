import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// import 'vant/lib/index.css'
import 'vant/lib/index.less'
import 'amfe-flexible'
// import '@/style/icon.less'
// import '@/style/reset.less'
import '@/style/index.less'

import * as obj from '@/filters'
import '@/components'
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})

Vue.config.productionTip = false
Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
