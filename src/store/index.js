import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import { alert } from './modules/alert'
import navbar from './modules/navbar'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    alert,
    navbar
  },
  getters
})

export default store
