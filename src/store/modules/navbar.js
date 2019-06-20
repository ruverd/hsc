const navbar = {
  state: {
    notification: true,
    search: false,
    background: false
  },

  mutations: {
    NOTIFICATION: (state,value) => {
      state.notification = value
    },
    SEARCH: (state,value) => {
      state.search = value
    },
    BACKGROUND: (state,value) => {
      state.background = value
    }
  },

  actions: {
    showNotification: (context,value) => {
      return new Promise(function(resolve, reject) {
        context.commit('SHOW_NOTIFICATION',value)
        resolve()
      });
    },
    showSearch: (context,value) => {
      return new Promise(function(resolve, reject) {
        context.commit('SEARCH',value)
        resolve()
      });
    },
    showBackground: (context,value) => {
      return new Promise(function(resolve, reject) {
        context.commit('BACKGROUND',value)
        resolve()
      });
    }
  }
}

export default navbar
