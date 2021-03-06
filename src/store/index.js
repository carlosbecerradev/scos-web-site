import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import sede from './sede'
import tipo_de_servicio from './tipo_de_servicio'
import tipo_de_incidencia from './tipo_de_incidencia'
import usuario from './usuario'
import cliente from './cliente'
import empleado from './empleado'
import orden_de_servicio from './orden_de_servicio'
import constancia_de_visita from './constancia_de_visita'
import encuesta_de_atencion from './encuesta_de_atencion'

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
    tipo_de_incidencia,
    usuario,
    cliente,
    empleado,
    orden_de_servicio,
    constancia_de_visita,
    encuesta_de_atencion,
  }
})
