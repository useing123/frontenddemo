export const state = () => ({
  isAuthenticated: false,
});

export const mutations = {
  SET_AUTHENTICATED(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },
};

export const actions = {
  setAuthenticated({ commit }, isAuthenticated) {
    commit("SET_AUTHENTICATED", isAuthenticated);
  },
};
