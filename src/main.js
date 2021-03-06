import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from '@/plugins/vuetify'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import global_ from '@/util/Global'
import theme from 'muse-ui/lib/theme'
axios.defaults.baseURL = 'http://localhost:8080'

theme.use('dark')

Vue.prototype.GLOBAL = global_
Vue.use(VueAxios, axios)
Vue.use(MuseUI)
Vue.use(ElementUI)
Vue.config.productionTip = false

//全局请求拦截
axios.interceptors.request.use((config) => {
  //请求的接口不是登录和验证码接口
  if (['/sysAdmin/login', '/captcha'].indexOf(config.url) === -1) {
    const token = localStorage.getItem('token')
    // const id = JSON.parse(localStorage.getItem('admin')).id
    if (token) {
      config.headers.Authorization = token
      config.headers.id = 'DE35D7CC05AF96A21D7ADFC8651E6614'
    }
  }

  return config
})

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
