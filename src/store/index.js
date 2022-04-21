import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: !!localStorage.getItem("isLoggedIn"),
  },
  mutations: {
    SET_AUTH(state) {
      localStorage.setItem("isLoggedIn", "true");
      state.loggedIn = true;
    },
    UNSET_AUTH(state) {
      localStorage.removeItem("isLoggedIn");
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
