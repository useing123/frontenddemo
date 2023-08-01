import Cookies from 'js-cookie';

export const state = () => ({
  isAuthenticated: false,
});

export const mutations = {
  setIsAuthenticated(state, value) {
    state.isAuthenticated = value;
  },
};

export const actions = {
  setAuthenticated({ commit }, value) {
    commit('setIsAuthenticated', value);
  },
  checkAuthenticated({ commit }) {
    const token = Cookies.get('jwt');
    if (token) {
      commit('setIsAuthenticated', true);
    } else {
      commit('setIsAuthenticated', false);
    }
  },
};
