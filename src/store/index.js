import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";
import user from "./modules/user";
import { alert } from "./modules/alert";
import { register } from "./modules/register";
import navbar from "./modules/navbar";
import getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    user,
    alert,
    register,
    navbar
  },
  getters,
  plugins: [createPersistedState()]
});

export default store;
