import { authService } from "src/services/auth";

const auth = {
  namespaced: true,
  state: {
    logged: sessionStorage.getItem("access_token") ? true : false,
    user: []
  },

  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
    LOGIN_REQUEST: (state, user) => {
      state.logged = true;
    },
    LOGIN_SUCCESS: state => {
      state.logged = true;
    },
    LOGIN_FAILURE: state => {
      state.logged = false;
    },
    LOGOUT: state => {
      state.logged = false;
    }
  },

  actions: {
    resetUserName: (context, link) => {
      return new Promise(function(resolve, reject) {
        context.commit("CHANGE_USER_NAME", link);
        resolve();
      });
    },
    login: ({ dispatch, commit }, { email, password }) => {
      commit("LOGIN_REQUEST", { email });

      authService
        .login(email, password)
        .then(commit("LOGIN_SUCCESS"))
        .then(result => {
          authService.me().then(result => {
            commit("SET_USER", result.data);
          });
        })
        .catch(err => {
          commit("LOGIN_FAILURE");
        });
    },
    register: ({ dispatch, commit }, { form }) => {
      authService
        .register(form)
        .then(commit("LOGIN_SUCCESS"))
        .then(result => {
          authService.me().then(result => {
            commit("SET_USER", result.data);
          });
        });
    },
    logout: ({ commit }) => {
      authService.logout();
      commit("LOGOUT");
    }
  }
};

export default auth;
