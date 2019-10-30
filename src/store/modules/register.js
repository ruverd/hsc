const state = {
  id: null
};

const actions = {
  setIdRegister({ commit }, id) {
    commit("setId", id);
  }
};

const mutations = {
  setId(state, id) {
    state.id = id;
  }
};

export const register = {
  namespaced: true,
  state,
  actions,
  mutations
};
