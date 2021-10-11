import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
  },
  mutations: {
    SET_AUTH(state) {
      state.loggedIn = true;
    },
    UNSET_AUTH(state) {
      state.loggedIn = false;
    },
  },
  actions: {
    setAuth({ commit }) {
      commit("SET_AUTH");
    },
    unsetAuth({ commit }) {
      commit("UNSET_AUTH");
    },
  },
  modules: {},
});
