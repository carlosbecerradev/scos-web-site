import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api_base_url: "http://localhost:8084/api",
  },
  mutations: {},
  actions: {},
  getters: {
    apiBaseURL: state => state.api_base_url,
  },
  modules: {
    auth,
  }
})
