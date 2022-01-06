import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import sede from './sede'
import tipo_de_servicio from './tipo_de_servicio'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api_base_url: "http://localhost:8084/api",
    perPage: 6,
    totalRows: 1,
  },
  mutations: {
    setTotalRows(state, payload) {
      state.totalRows = payload
    },
  },
  actions: {},
  getters: {
    apiBaseURL: state => state.api_base_url,
    perPage: state => state.perPage,
    totalRows: state => state.totalRows,
  },
  modules: {
    auth,
    sede,
    tipo_de_servicio,
  }
})
