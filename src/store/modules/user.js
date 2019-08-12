import  { userService }  from 'src/services/user';

const user = {
  namespaced: true,
  state: {
      
  },

  mutations: {
   
  },

  actions: {
    updatePassword: ({ dispatch, commit }, { password }) => {

        // authService.login(email, password)
        //     .then(commit('LOGIN_SUCCESS'))
        //     .then(result => {
        //       authService.me()
        //         .then(result => {
        //           commit('SET_USER', result.data);
        //         })
        //     })
        //     .catch(err => {
        //       commit('LOGIN_FAILURE')
        //     })
    },
  }
}

export default user
