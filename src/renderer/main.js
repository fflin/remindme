import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

const WinUtil = require('electron-window-util')
const electron = require('electron')

let baseUrl = electron.remote.getGlobal('baseUrl')
let win = new WinUtil({
  baseUrl: baseUrl,
  router: router
})
Vue.prototype.$Win = win
/* eslint-disable no-new */

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
new Vue({
  components: {
    App
  },
  router,
  store,
  template: '<App/>'
}).$mount('#index-app')
