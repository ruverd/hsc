import Vue from 'vue'
import './pollyfills'
import VueRouter from 'vue-router'
import VueRouterPrefetch from 'vue-router-prefetch'
import VueNotify from 'vue-notifyjs'
import VueTheMask from 'vue-the-mask'
import VeeValidate, { Validator } from 'vee-validate'
import ElementUI from 'element-ui'
// import VeeElement from 'vee-element'
import lang from 'element-ui/lib/locale/lang/pt-br'
import locale from 'element-ui/lib/locale'
import ptBr from 'vee-validate/dist/locale/pt_BR'
import App from './App.vue'

// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import SideBar from './components/UIComponents/SidebarPlugin'
import initProgress from './progressbar'

// // router setup
import router from "./services/router";

// store setup
import store from './store'

// library imports
import './assets/sass/paper-dashboard.scss'
import sidebarLinks from './sidebarLinks'
import './registerServiceWorker'

// plugin setup
Vue.use(VueRouter)
Vue.use(VueRouterPrefetch)
Vue.use(GlobalDirectives)
Vue.use(GlobalComponents)
Vue.use(VueNotify)
Vue.use(VueTheMask)
Vue.use(SideBar, {sidebarLinks: sidebarLinks})
Vue.use(ElementUI)
// Vue.use(VeeElement, validator)
Vue.use(VeeValidate,{
  fieldsBagName: 'veefields'
})

locale.use(lang)
Validator.localize('pt_BR', ptBr)

initProgress(router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
